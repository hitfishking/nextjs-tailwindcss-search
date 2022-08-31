import isEqual from 'fast-deep-equal'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'

// 最终要的，建立一个全局context对象，存储的数据类型是{dispatcher}.
const Context = React.createContext<{ dispatcher: Dispatcher }>(null)

class Dispatcher {
  callbacks: Record<string, Set<Function>> = {} // namespace -->cb()集
  data: Record<string, unknown> = {} // namespace --> data; 存储model()函数返回的结果，通常是一个对象.
  update = (namespace: string) => {
    if (this.callbacks[namespace]) {
      this.callbacks[namespace].forEach((cb) => {
        try {
          const data = this.data[namespace]
          cb(data) // 循环将cb()函数施加在model()函数返回的结果data对象上.
        } catch (e) {
          cb(undefined)
        }
      })
    }
  }
}

interface ExecutorProps {
  hook: () => any;
  onUpdate: (val: any) => void;
  namespace: string;
}

// Executor组件函数，用于运行用户Model() hook函数，并将返回值update到context的dispatcher对象中.
// 每次render都会运行一次Exector，调用Model hook，将返回内容记录(update)到全局context的dispatcher对象中。
function Executor (props: ExecutorProps) {
  const { hook, onUpdate, namespace } = props // namespace参数在本函数中只提信息提示作用，无功能性作用。

  const updateRef = useRef(onUpdate) // 只在第一运行该组件函数时被赋值，没有再次修改它的逻辑；以后运行只是使用这个update函数.
  const initialLoad = useRef(false)

  let data: any
  try {
    // 运行用户自定义Model() hook，返回结果状态集，存入data.
    // 该hook函数是在Exector组件中运行的，则Model hook中建立的各种state数据槽应该在Executor组件的fiber中建立。
    // 随后，将hook运行的结果状态集保存到context dispatcher对象中。
    // Executor本身并不存在能够改变其fiber中各个状态槽数据的方法，因此这些状态槽数据不会再变化，Executor自然不会被更新。
    data = hook()
  } catch (e) {
    console.error(
      `plugin-model: Invoking '${namespace || 'unknown'}' model failed:`,
      e
    )
  }

  useMemo(() => {
    updateRef.current(data) // 只在mount时运行一次，将data对象update到context中的dispatcher对象中.
  }, [])

  // React 16.13 后 update 函数用 useEffect 包裹
  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data) // 第二次及以后的render完毕后，都要重新计算hook，并将返回值update到dispatcher中.
    } else {
      initialLoad.current = true // 第一次render后， initialLoad就必然为true.
    }
  })

  return null
}

const dispatcher = new Dispatcher()

// 在VDOM树的上端要加入<Context.Provider>组件，其下紧跟着<Executor>组件，计算出Model() hook，并更新到
// context的dispatcher对象中；在VDOM上端尽早做完这些工作，等待下方组件用<Context.Consumer>或useContext来使用这些"全局数据".
// 设计上，可以一次提供一个model()函数表格给Provider()，集中运行并存储到context的dispatcher对象中。
// <Provider>作为一个上层函数组件，各种下层组件都要作为其子组件存在，因此必须接收一个children参数。
export function Provider (props: {
  models: Record<string, any>;
  children: React.ReactNode;
}) {
  return (
    <Context.Provider value={{ dispatcher }}>
      {Object.keys(props.models).map((namespace) => {
        return (
          <Executor
            key={namespace}
            hook={props.models[namespace]}
            namespace={namespace}
            onUpdate={(val) => {
              dispatcher.data[namespace] = val
              dispatcher.update(namespace)
            }}
          />
        )
      })}
      {props.children}
    </Context.Provider>
  )
}

// 这个版本的useModel(), selector是any，简单很多；且函数返回值没做任何规定(默认也是any)，约束少了很多。
// useModel就是通过useContext,取得vdom树上部的context provider中的dispatcher数据，
// dispather中的数据通过namespace分组，并可通过useModel从外部传入的selector裁剪为精准子集返回。
// 注意1：用户Model hook函数其实是在Executor组件中运行的，其状态槽都建立在Executor的fiber中；然后将状态槽集合的引用存到dispatcher中；
//       使用useModel引入用户model hook的那个下层应用组件，会存储必要的useContext状态槽，但并不会存储用户model hook的状态槽；
//       而是通过selector，对已经被Exector存储到dispatcher的状态槽集合进行裁剪，然后建立到本下层应用组件中，体现在其fiber中；
//       这些被裁剪后的状态槽的集合，在本下层组件中就是一个状态槽：state;
//       当用户与本下层组件交互时，可以使用该state中的值，也可以调用该state中提供的用户model函数，通过外部事件函数调用，
//       如onClick={()=>flipClick(value)},实现该用户下层组件的功能；
//       Model中的状态函数实际上是存储在Executor组件的fiber中的，被context dispatcher对象引用，进而通过useModel()被该用户下层组件引用；
//       调用Model状态函数，实际上是调用Executor fiber中的函数，改变了Executor状态槽，进而改变了Context dispatcher，引发下层用户组件的更新。
export function useModel (namespace: string, selector?: any) {
  const { dispatcher } = useContext<{ dispatcher: Dispatcher }>(Context)
  const selectorRef = useRef(selector)
  selectorRef.current = selector // 保存selector()函数

  // useState(initval)中的initval，只在第一次运行时起作用，
  // 以后的运行都直接从fiber变量中读取state值，而忽略该初始值.
  const [state, setState] = useState(() => // 初始化函数
    selectorRef.current // 若有selector()函数，则将model() hook返回的对象进行select之后再返回，否则直接返回该对象.
      ? selectorRef.current(dispatcher.data[namespace])
      : dispatcher.data[namespace]
  )
  // 保存一份state，作为下次render时调用的cb()中判断state是否有变化的依据。
  // ?? state每次render都会取回，为何还要另外存储一份?
  const stateRef = useRef<any>(state)
  stateRef.current = state

  const isMount = useRef(false)
  useEffect(() => {
    isMount.current = true
    return () => {
      isMount.current = false
    }
  }, [])

  useEffect(() => {
    // 定义一个handler()，即Dispatcher.namespace下的一个cb()函数;
    // 当dispatcher.namespace.data被<Executor>的onUpdate()自动更新后，会引发订阅者<UserComp>的重新render；
    // 但<UserComp>中由useModel()建立的状态变量，还须要用专门的setState()进行更改才行；
    // cb()就是由各个<UserComp>注册的side effect函数中定义的handler函数，调用入口在各<UserComp>侧(通过调用Update())，
    // 目的就是根据最新的dispatcher.namespace.data，更新<UserComp>组件的依赖state。
    const handler = (data: any) => {
      if (!isMount.current) {
        setTimeout(() => {
          dispatcher.data[namespace] = data
          dispatcher.update(namespace)
        })
      } else {
        // <Executor>中的userModel()的data，通常是在<UserComp>中，通过异步事件中调用，调用data中的
        // set**()而改变的，这些改变后的data会通过<Executor>的onUpdate，自动更新到Context dispatcher中；
        // 而dispatcher的每个namespace，除了data外，还有一套cb()函数；这些cb()从哪里来? 做什么用的呢?
        // 这里，恰恰就是cb()的一个作用实例：
        // cb()是<UserComp>中useEffect()的side effect函数中定义的一个handler函数，其核心逻辑只有一个：
        // 那就是用dispatcher中的最新data,更新(setState())<UserComp>中由useModel()创建的状态变量state；
        // side effect函数将该handler注册(只一次)到dispatcher.namespace.[cb()]中，成为一个cb()；
        // 然后在<UserComp>的side effect函数中，通过dispatcher.Update()统一调用cb()；
        // 从而实现在<UserComp>的render阶段(后)，能利用dispatcher的最新data来更新该组件的依赖state。
        const currentState = selectorRef.current
          ? selectorRef.current(data)
          : data
        const previousState = stateRef.current
        if (!isEqual(currentState, previousState)) {
          // !必须要有调用该函数的地方，才能有机会改变state；但要在side effect函数中调用，而不能直接在hook中调用。
          //
          setState(currentState)
        }
      }
    }

    dispatcher.callbacks[namespace] ||= new Set() // x||=y 等同于 x || x=y; 确保callback[namesapce] key的value(集合类型)存在.
    dispatcher.callbacks[namespace].add(handler)
    dispatcher.update(namespace) // 在cb()集合中添加一个handler()函数，并运行所有cb(data).

    return () => {
      dispatcher.callbacks[namespace].delete(handler) // 去除该handler()函数
    }
  }, [namespace]) // 对每个namespace，该side effect函数只运行一次.

  return state
}

// 将各type文件中的内容集中在此文件中导出，便于外部使用，避免逐个文件导入的麻烦。
// 程序的任何部分都可能有对应的type定义，分别建立独立的type文件，便于识别和管理。
export * from './typ_lib_base'
export * from './typ_game'

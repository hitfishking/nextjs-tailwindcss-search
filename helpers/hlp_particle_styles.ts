const firework1 = {
  fullScreen: {
    enable: false
  },
  detectRetina: true,
  background: {
    color: '#008000',
    opacity: 1
  },
  fpsLimit: 60,
  emitters: {
    direction: 'top',
    life: {
      count: 0, // 无数个,emitter不断发射新粒子
      duration: 0.1,
      delay: 0.3 // 0.1
    },
    rate: {
      delay: 0.06, // 原0.03，设慢一些，太快显得乱.
      quantity: 1 // 每1帧中的firework数量，1个，不要多，乱.
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
  particles: { // properties of the main firework particle
    number: {
      value: 0 // to ramdomiser the number of particles
    },
    destroy: {
      mode: 'split', // to get the fireworks effect
      split: {
        rate: {
          value: 70 // amount of splits
        },
        particles: {
          // setting properties of those particles formed after spliting
          color: {
            value: [
              '#FFC0CB' /* Pink */,
              '#FFB6C1' /* LightPink */,
              '#FF69B4' /* HotPink */,
              '#FF1493' /* DeepPink */,
              '#DB7093' /* PaleVioletRed */,
              '#C71585' /* MediumVioletRed */,
              '#00FFFF', // acqua
              'rgb(124, 252, 0)' // grassy green
            ]
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.1,
              sync: false,
              startValue: 'max', // multiple fireworks
              destroy: 'min'
            }
          },
          shape: {
            type: 'star'
          },
          size: {
            value: 1,
            animation: {
              enable: false // to get the sparkly feeling
            }
          },
          life: {
            count: 1, // amount of time
            duration: {
              value: {
                min: 1,
                max: 2
              }
            }
          },
          move: {
            // all about firework showers
            enable: true, // to get the fireworks effect
            gravity: {
              enable: false // stops gravity from pullinhg them up
            },
            speed: 3, // speed of the fireworks
            direction: 'none', // direction of the fireworks
            outMode: 'destroy' // avoids overlapping of fireworks
          }
        }
      }
    },
    life: {
      count: 1
    },
    shape: {
      type: 'line'
    },
    size: {
      value: { min: 1, max: 100 },
      animation: {
        enable: true,
        sync: true,
        speed: 150,
        startValue: 'random',
        destroy: 'min'
      }
    },
    stroke: {
      color: {
        value: '#383838'
      },
      width: 1
    },
    rotate: {
      path: true// single path
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true, // to avoid projectiles and follow a st line
        maxSpeed: 100
      },
      speed: { min: 10, max: 20 },
      outModes: {
        default: 'destroy'
      },
      trail: { // to give the split particle a trail so that we can see its dirn
        enable: true,
        length: 10
      }
    }
  }
}

const firework2 = {
  fullScreen: {
    enable: false
  },
  detectRetina: true,
  background: {
    // color: '#000'
  },
  fpsLimit: 60,
  emitters: {
    direction: 'top',
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.5
    },
    rate: {
      delay: 0.01,
      quantity: 1
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
  particles: {
    number: {
      value: 0
    },
    destroy: {
      mode: 'split',
      split: {
        count: 1,
        factor: { value: 1 / 3 },
        rate: {
          value: 100
        },
        particles: {
          color: {
            value: ['#5bc0eb', '#fde74c', '#9bc53d', '#e55934', '#fa7921']
          },
          stroke: {
            width: 0
          },
          number: {
            value: 0
          },
          collisions: {
            enable: false
          },
          opacity: {
            value: 1,
            animation: {
              enable: true,
              speed: 0.6,
              minimumValue: 0.1,
              sync: false,
              startValue: 'max',
              destroy: 'min'
            }
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 2, max: 3 },
            animation: {
              enable: false
            }
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2
              }
            }
          },
          move: {
            enable: true,
            gravity: {
              enable: false
            },
            speed: 2,
            direction: 'none',
            random: true,
            straight: false,
            outMode: 'destroy'
          }
        }
      }
    },
    life: {
      count: 1
    },
    shape: {
      type: 'line'
    },
    size: {
      value: { min: 1, max: 100 },
      animation: {
        enable: true,
        sync: true,
        speed: 150,
        startValue: 'random',
        destroy: 'min'
      }
    },
    stroke: {
      color: {
        value: '#303030'
      },
      width: 1
    },
    rotate: {
      path: true
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100
      },
      speed: { min: 10, max: 20 },
      outModes: {
        default: 'destroy',
        top: 'none'
      },
      trail: {
        fillColor: '#000',
        enable: true,
        length: 10
      }
    }
  }
}

const heart1 = {
  fullScreen: {
    enable: true
  },
  background: {
    color: {
      // value: '#301A47'
    }
  },
  particles: {
    color: {
      value: [
        '#FFAEBC',
        '#A0E7E5',
        '#B4F8C8',
        '#FBE7C6',
        '#FFC9AE',
        '#FFAEE5',
        '#A0C6E7',
        '#A0E7C2',
        '#B4F8EA',
        '#C2F8B4',
        '#F4FBC6',
        '#FBCDC6'
      ]
    },
    move: {
      angle: {
        offset: 0,
        value: 15
      },
      direction: 'bottom',
      enable: true,
      outModes: {
        default: 'out'
      },
      speed: 3
    },
    number: {
      value: 300
    },
    opacity: {
      value: 1
    },
    shape: {
      type: 'heart'
    },
    size: {
      value: 16
    },
    roll: {
      darken: {
        enable: true,
        value: 30
      },
      enlighten: {
        enable: true,
        value: 30
      },
      enable: true,
      mode: 'horizontal',
      speed: {
        min: 5,
        max: 15
      }
    },
    zIndex: {
      value: {
        min: 0,
        max: 100
      },
      opacityRate: 0,
      velocityRate: 2
    }
  }
}

const heart2 = {
  fullScreen: {
    enable: true
  },
  background: {
    color: {
      // value: "#301A47"
    }
  },
  particles: {
    color: {
      value: [
        '#FFAEBC',
        '#A0E7E5',
        '#B4F8C8',
        '#FBE7C6',
        '#FFC9AE',
        '#FFAEE5',
        '#A0C6E7',
        '#A0E7C2',
        '#B4F8EA',
        '#C2F8B4',
        '#F4FBC6',
        '#FBCDC6'
      ]
    },
    move: {
      decay: {
        min: 0.05,
        max: 0.15
      },
      direction: 'top',
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: true,
        maxSpeed: 200
      },
      outModes: {
        top: 'none',
        default: 'destroy'
      },
      speed: {
        min: 10,
        max: 20
      }
    },
    number: {
      value: 0
    },
    opacity: {
      value: 1
    },
    shape: {
      type: 'heart'
    },
    size: {
      value: { min: 4, max: 16 }
    },
    roll: {
      darken: {
        enable: true,
        value: 30
      },
      enlighten: {
        enable: true,
        value: 30
      },
      enable: true,
      mode: 'horizontal',
      speed: {
        min: 5,
        max: 15
      }
    }
  },
  emitters: {
    size: {
      width: 0,
      height: 0
    },
    life: {
      duration: 0.5,
      delay: 2,
      count: 0
    },
    rate: {
      quantity: 5,
      delay: 0.1
    }
  }
}

const arrFwkTypes = [firework1, firework2, heart1, heart2]

export function getParticleStyle (idx: number) {
  let i = idx
  if (idx === -1) {
    i = Math.floor(Math.random() * 2) // 目前数组不能全用(arr.length)，只有前2个可用.
  }
  return arrFwkTypes[i]
}

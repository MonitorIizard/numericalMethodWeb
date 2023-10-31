import InputData from "@/class/derivative-class/InputData";
import { number } from "mathjs";

const { derivative, evaluate, e } = require("mathjs")

export interface DifferentiationResult  {
  result: number;
	fx: { [key: number]: number };
	h: number;
	exactFunc: string;
	exactResult: number;
	errorValue: number;
	error?: string;
}

export default class Derivative {
  diffFormula : {
    [order : string] : {
      [direction : string] : {
        [accuracy : string] : {
          [key : string] : number | string;
          fraction : string;
        }
      }
    }
  } = {
    "first-derivative" : {
      "forward_finite-divided-difference" : {
        "h" : {
          '1' : 1,
          '0' : -1,
          fraction : "h" 
        },
        "h^2" : {
          '2' : -1,
          '1' : 4,
          '0' : -3,
          fraction : "2*h" 
        }
      },
      "backward_finite-divided-difference" : {
        "h" : {
          '0' : 1,
          '1' : -1,
          fraction : "h" 
        },
        "h^2" : {
          '0' : 3,
          '-1' : -4,
          '2' : 1,
          fraction : "2 * h" 
        }
      },
      "centered_finite-divided-difference" : {
        "h^2" : {
          '1' : 1,
          '-1' : -1,
          fraction : "2 * h"
        },
        "h^4" : {
          '2' : -1,
          '1' : 8,
          '-1' : -8,
          '-2' : 1,
          fraction : "12 * h"
        }
      }
    },
    "second-derivative" : {
      "forward_finite-divided-difference" : {
        "h" : {
          '2' : 1,
          '1' : 2,
          '0' : 1,
          fraction : "h^2" 
        },
        "h^2" : {
          '3' : -1,
          '2' : 4,
          '1' : -5,
          '0' : 2,
          fraction : "h^2" 
        }
      },
      "backward_finite-divided-difference" : {
        "h" : {
          '0' : 1,
          '-1' : -2,
          '-2' : 1,
          fraction : "h^2" 
        },
        "h^2" : {
          '0' : 2,
          '-1' : -5,
          '-2' : 4,
          '-3' : -1,
          fraction : "h^2" 
        }
      },
      "centered_finite-divided-difference" : {
        "h^2" : {
          '1' : 1,
          '0' : -2,
          '-1' : 1,
          fraction : "h^2"
        },
        "h^4" : {
          '2' : -1,
          '1' : 16,
          '0' : -30,
          '-1' : -16,
          '-2' : 1,
          fraction : "12 * (h ^ 2)"
        }
      }
    },
    "third-derivative" : {
      "forward_finite-divided-difference" : {
        "h" : {
          '3' : 1,
          '2' : -3,
          '1' : 3,
          '0' : -1,
          fraction : "h^3" 
        },
        "h^2" : {
          '4' : -3,
          '3' : 14,
          '2' : -24,
          '1' : 18,
          '0' : -5,
          fraction : "2 * h^3" 
        }
      },
      "backward_finite-divided-difference" : {
        "h" : {
          '0' : 1,
          '-1' : -3,
          '-2' : 3,
          '-3' : -1,
          fraction : "h^3" 
        },
        "h^2" : {
          '0' : 5,
          '-1' : -18,
          '-2' : 24,
          '-3' : -14,
          '-4' : 3,
          fraction : "2*h^3" 
        }
      },
      "centered_finite-divided-difference" : {
        "h^2" : {
          '2' : 1,
          '1' : -2,
          '-1' : 2,
          '-2' : -2,
          fraction : "2 * (h^3)"
        },
        "h^4" : {
          '3' : -1,
          '2' : 8,
          '1' : -13,
          '-1' : 13,
          '-2' : 8,
          '-3' : 1,
          fraction : "8 * (h ^ 3)"
        }
      }
    },
    "fourth-derivative" : {
      "forward_finite-divided-difference" : {
        "h" : {
          '4' : 1,
          '3' : -4,
          '2' : 6,
          '1' : -4,
          '0' : 1,
          fraction : "h^4" 
        },
        "h^2" : {
          '5' : -2,
          '4' : 11,
          '3' : -24,
          '2' : 26,
          '1' : -14,
          '0' : 3,
          fraction : "h^4" 
        }
      },
      "backward_finite-divided-difference" : {
        "h" : {
          '-4' : 1,
          '-3' : -4,
          '-2' : 6,
          '-1' : -4,
          '0' : 1,
          fraction : "h^4" 
        },
        "h^2" : {
          '-5' : -2,
          '-4' : 11,
          '-3' : -24,
          '-2' : 26,
          '-1' : -14,
          '0' : 3,
          fraction : "h^4" 
        }
      },
      "centered_finite-divided-difference" : {
        "h^2" : {
          '2' : 1,
          '1' : -4,
          '0' : 6,
          '-1' : -4,
          '-2' : 1,
          fraction : "h^4"
        },
        "h^4" : {
          '3' : -1,
          '2' : 12,
          '1' : -39,
          '0' : 56,
          '-1' : -39,
          '-2' : 12,
          '-3' : -1,
          fraction : "6 * (h ^ 4)"
        }
      }
    }
  }

  equation : string;
  xToFind : number;
  h : number;
  direction : string;
  order : string;
  accuracy : string;

  constructor(data : InputData | undefined) {
    this.equation = data!.equation;
    this.xToFind = data!.xToFind;
    this.h = data!.h;
    this.direction = data!.direction;
    this.order = data!.order;
    this.accuracy = data!.accuracy;
  }

  differentiation() {
  if ( this.equation === "" ) return;

  const result :  DifferentiationResult  = {
    result: 0,
		fx: {},
		h: 0,
		exactFunc: '',
		exactResult: 0,
		errorValue: 0
  }

  const calculateFx = (i: number): number => {
		const xValue = this.xToFind + i * this.h;
		return evaluate(this.equation, { x: xValue });
	};

  const formula = this.diffFormula[this.order][this.direction][this.accuracy];

  result.exactFunc = this.equation;

  const order = Object.keys(this.diffFormula).indexOf(this.order);
  console.log( order );

  for ( let i = 0; i <= order; i++ ) {
    result.exactFunc = derivative(result.exactFunc, 'x').toString();
  }

  result.exactResult = evaluate(result.exactFunc, { x : this.xToFind });

  let hValue = evaluate(formula.fraction, {h : this.h});
  result.h = hValue;

  for ( let key in formula ) {
    if ( key === "fraction" ) continue;

    const coefficient = formula[key];
    const termValue = Number(coefficient) * calculateFx(parseInt(key));
    result.fx[parseInt(key)] = termValue;
    result.result += termValue / hValue;
  }

  result.errorValue = Math.abs(result.result - result.exactResult) / result.exactResult * 100;

  return result;
}

}
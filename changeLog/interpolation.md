**Task**
- [x] Newton Divided-difference
- [x] Largrange
- [x] Spline
- Linear 
- Quadratic
- Cubric

### 25-10-66
- Create Ui component for input
- [x] inputField
- [x] solution
- [x] calculate method
- [x] Graph


in input field there is a function, a function to setGivenData filtered from data that is checked by user.

22:16

plotly cannot find self : https://github.com/plotly/react-plotly.js/issues/272
have to do dynamic import

### 26-10-66
**Implement Graph**
- I want to send props to graph component but the question is which data should I send.
- `Grap componet` I plan to display the graph and points of given data.
- Graph come from calculate a plently of points of (x. y) from function.
- I should send points of given data and setOf point from function

- Conclusion : 
```
props : - point of answer
        - points of given data
        - graph
```

Implement X to find input : receive and read data 

Found bug about can't access object because type of setInputData function in input component have a same variable

**but I dont know wtf is happen. It just work.**

#### Implement Largrange
- [ ] need to ascending grap point
- add Largrange equation

**28-10-2566**
#### Implement Spline
- [x] create UI, 3 button to choose type of spline to utilize.
- [x] implement calculate method

**29-10-2566**
#### Implement Regression

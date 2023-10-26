**Task**
- [ ] Newton Divided-difference
- [ ] Largrange
- [ ] Spline
- Linear 
- Quadratic
- Cubric

### 25-10-66
- Create Ui component for input
- [x] inputField
- [x] solution
- [ ] calculate method
- [x] Graph


in input field there is a function, a function to setGivenData filtered from data that is checked by user.

22:16

plotly cannot find self : https://github.com/plotly/react-plotly.js/issues/272
have to do dynamic import

### 26-10-66
Implement Graph
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

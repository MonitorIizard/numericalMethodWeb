## 3 November 2566
**Task**
- [x] write Post API each record must be unique
- [ ] write Get API
- [ ] history UI
- [ ] When choose button, fetch data from database


### write record when it new
I check record must be unique by select the record `where` data is the input data, if return of select record is not `[ ] or empty`  it mean this gonna be the first record.

### Write Get API
from history bar page I want when we click  `Get To` button, the data will display on input field.

- I think we might have to go to `app.tsx` and when the page is create successfully. We call an api to `get` the record from `query ID`.
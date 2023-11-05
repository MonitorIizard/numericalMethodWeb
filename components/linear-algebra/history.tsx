import { useEffect,  useRef,  useState  } from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from "react-katex";
import { Card, Modal, ThemeProvider, createTheme } from '@mui/material';
import Button from '@mui/material/Button';
import { NextLinkComposed } from '../../src/Link';

type Data = {
  id : number,
  time : string,
  equation : string,
  x_start : number[],
  x_end : number,
  tolerance : number,
}

export default function Page({isOpen, setOpen} : {isOpen : boolean, setOpen : (isOpen : boolean) => void}) {
  const [data, setData] = useState<any[]>([]);
  
  async function getData() {
    const type = new URLSearchParams(window.location.search).get('type');
    console.log(type);
    const res = await fetch('http://localhost:3000/api/linear-algebra/list?' + new URLSearchParams({
      type : type!
    }), {
		method: 'GET'
	}); 
    const json = await res.json();
    setData(json.data || []);
    // console.log(json.data);
  }

  const theme = createTheme({
      palette : {
        mode: 'dark',
    }
  });

  const count = useRef(0);
  useEffect(() => {
    if(count.current === 0) getData();  
    count.current++;
  }, [])

	return (
      <Modal  open={isOpen}
              onClose={() => setOpen(!isOpen)}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
              className='overflow-scroll pt-20'>
        <Card className={`w-11/12 max-w-5xl text-md mx-auto `}>
          <h1 className='border-solid border-2 border-black text-4xl text-center font-bold py-4'>History</h1>
          <ul>
             { 
                data.length != 0 ?
                data.map(record => {
                return (
                <li className='relative border-solid border-2 border-t-0 border-black p-4' key={record.id}>
                  <InlineMath>{`\\text{Date : ${record.time.slice(0,10)} } \\text{Time : ${record.time.slice(11, 20)}}`}</InlineMath>
                  <br />
                  <InlineMath>{`Dimension = ${record.dimension}`}</InlineMath>
                  <br /><br />
                  {
                    record.error_criteria ?
                    <>
                      <InlineMath>{`\\text{Tolerance Error = ${record.error_criteria}}`}</InlineMath>
                      <br /><br />
                    </>
                    :
                    <></>
                  }
                  <InlineMath>{`matrixA =  \\begin{bmatrix} ${JSON.stringify(record.matrixA.map((row:number[]) => JSON.stringify(row).replaceAll("]", "\\").replaceAll(",", "&").replaceAll("[", ""))).replace("[", "").replace("]","").replaceAll('"', "").replaceAll(",","")}\\end{bmatrix}`}</InlineMath>
                  <br /><br />
                  <InlineMath>{`matrixB = \\begin{bmatrix} ${JSON.stringify(record.matrixB).replace("[", "").replace("]","").replaceAll('"', "").replaceAll(",","&")}\\end{bmatrix}`}</InlineMath>
                  <br /><br />
                  <InlineMath>{`matrixX = \\begin{bmatrix} ${JSON.stringify(record.matrixX).replace("[", "").replace("]","").replaceAll('"', "").replaceAll(",","&")}\\end{bmatrix}`}</InlineMath>

                  <ThemeProvider theme={ theme }>
                    <Button variant="contained"
                            component={ NextLinkComposed }
                            to={{
                                  pathname : location.protocol + '//' + location.host + location.pathname, 
                                  query : {
                                    type : new URLSearchParams(window.location.search).get('type'),
                                    id : record.id
                                  }
                            }}
                            onClick={() => setOpen(!isOpen)}
                            className='absolute right-5 top-1/2 -translate-y-1/2'>Get To</Button>
                  </ThemeProvider>
                </li>)
                }
              )
              :
              <li>
                <h1 className='text-2xl text-center p-4'>No History (You should make one 😉.)</h1>
              </li>
            }
          </ul>
        </Card>
      </Modal>
	);
}

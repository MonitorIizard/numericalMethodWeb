import { useEffect,  useRef,  useState  } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from "react-katex";
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
    const res = await fetch('http://localhost:3000/api/root-of-equation/list?' + new URLSearchParams({
      type : type!
    }), {
		method: 'GET'
	}); 
    const json = await res.json();
    setData(json.data);
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
              className='overflow-scroll'>
        <Card className={`w-11/12 max-w-md text-md mx-auto `}>
          <ul>
              {
                data.map( (row, idx) =>
                <li className='border-solid border-2 border-t-0 border-black flex p-4 relative w-full' key={idx}>
                  <div>
                    <InlineMath>{`equation = ${row.equation}`}</InlineMath>
                    <br />
                    <InlineMath>{`x_{start} = ${row.x_start[0]}`}</InlineMath>
                    <br />
                    <InlineMath>{`x_{end} = ${row.x_end}`}</InlineMath>
                    <br />
                    <InlineMath>{`tolerance = ${row.tolerance}`}</InlineMath>
                    <br />
                  </div>
                  <ThemeProvider theme={ theme }>
                    <Button variant="contained"
                            component={ NextLinkComposed }
                            to={{
                                  pathname : location.protocol + '//' + location.host + location.pathname, 
                                  query : {
                                    type : new URLSearchParams(window.location.search).get('type'),
                                    id : row.id
                                  }
                            }}
                            onClick={() => setOpen(!isOpen)}
                            className='absolute right-5 top-1/2 -translate-y-1/2'>Get To</Button>
                  </ThemeProvider>
              </li>)}
          </ul>
        </Card>
      </Modal>
	);
}

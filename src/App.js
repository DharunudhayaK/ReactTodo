import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { data, editItem, inp, inp2, popA } from './reducer/state/State';

function App() {

  const dispatch = useDispatch()
  const selector = useSelector((state) => state.capture.arrOfObj)
  const selector2 = useSelector((state) => state.capture.inputVal1)
  const selector3 = useSelector((state) => state.capture.inputVal2)
  const selector4 = useSelector((state) => state.capture.editData)

  const [popup, setPopup] = useState(false)
  const [edit, setEdit] = useState(false)
  const [temp, setTemp] = useState('')
  const [temp2, setTemp2] = useState('')
  const [temp3, setTemp3] = useState(0)

  var requestOptions = { method: "GET" };

  useEffect(() => {
    axios.get('http://localhost:3030/posts', requestOptions)
      .then((response) => {
        let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
        storePromise.then(() => dispatch(data({ payload: response.data })))
        storePromise.catch(() => dispatch(data({ payload: response.data })))
      })
  }, [])

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3030/posts/${id}`);
      axios.get('http://localhost:3030/posts', response.data)
        .then((response) => {
          let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
          storePromise.then(() => dispatch(data({ payload: response.data })))
          storePromise.catch(() => dispatch(data({ payload: response.data })))
        })
    } catch (error) {
    }
  }

  const handleEdit = (ele) => {
    dispatch(editItem(ele))
    setEdit(true)
  }

  const add = () => {
    const userData = { title: selector2, body: selector3 };
    axios.post("http://localhost:3030/posts", userData)
      .then((response) => {
        let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
        storePromise.then(() => {
          axios.get('http://localhost:3030/posts')
            .then((response) => {
              let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
              storePromise.then(() => dispatch(data({ payload: response.data })))
              storePromise.catch(() => dispatch(data({ payload: response.data })))
            })
        })
        storePromise.catch(() => dispatch(data({ payload: response.data })))
      })
    setPopup(false)
  }

  const update = () => {
    let store;
    selector.payload.forEach((ele) => {
      if (ele.id === parseInt(temp3)) {
        const response = axios.delete(`http://localhost:3030/posts/${ele.id}`);
        axios.get('http://localhost:3030/posts', response.data)
          .then((response) => {
            let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
            storePromise.then(() => dispatch(data({ payload: response.data })))
            storePromise.catch(() => dispatch(data({ payload: response.data })))
          })
        const userData = { title: temp, body: temp2 };
        axios.post("http://localhost:3030/posts", userData)
          .then((response) => {
            let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
            storePromise.then(() => {
              axios.get('http://localhost:3030/posts')
                .then((response) => {
                  let storePromise = new Promise((resolve, reject) => (response) ? resolve() : reject())
                  storePromise.then(() => dispatch(data({ payload: response.data })))
                  storePromise.catch(() => dispatch(data({ payload: response.data })))
                })
            })
            storePromise.catch(() => dispatch(data({ payload: response.data })))
          })
      }
    })
    setEdit(false)
    setTemp("")
    setTemp2("")
    setTemp3("")
  }

  const handleClose = () => {
    setEdit(false)
    dispatch(popA(""))
    dispatch(popA(""))
  }

  return (
    <div className="App">
      <div className='another'>
        <h1>My Blog</h1>
        <button className='navaddBtn' onClick={() => setPopup(true)}>new task</button>
      </div>
      <div className='innerContent'>
        {
          selector.payload ? selector.payload.map((ele) => {
            return (
              <div className='outer'>

                <div className='content'>
                  <h1>Title: {ele.title}</h1>
                  <p>Body: {ele.body}</p>
                  <h3>ID: {ele.id}</h3>
                </div>

                <div className='btn'>
                  <button className='editBtn' onClick={() => handleEdit(ele)}>edit</button>
                  <button className='delBtn' onClick={() => handleDelete(ele.id)}>delete</button>
                </div>

              </div>
            )
          }) : ""
        }
      </div>

      <div className={` ${popup === true ? 'popupBg' : 'hide'}`} >
        <div className={` ${popup === true ? 'popup' : 'hide'}`}>
          <div className='popupNav'>
            <h2>add form</h2>
            <span className='closeBtn' onClick={() => setPopup(false)}>x</span>
          </div>

          <p className='lineLabel'></p>
          <form className='formLabel'>
            <label className='label' >title</label>
            <input type='text' className='inputBox' onInput={(e) => dispatch(inp(e.target.value))} ></input>
            <label className='label'>body</label>
            <input type='text' className='inputBox' onInput={(e) => dispatch(inp2(e.target.value))}></input>
          </form>

          <div>
            <button className='popupAdd' onClick={() => add()}>add</button>
          </div>
        </div>
      </div>

      <div className={` ${edit === true ? 'popupBg' : 'hide'}`} >
        <div className={` ${edit === true ? 'popup' : 'hide'}`}>
          <div className='popupNav'>
            <h2>edit form</h2>
            <span className='closeBtn' onClick={() => handleClose()}>x</span>
          </div>

          <p className='lineLabel'></p>
          <form className='formLabel'>
            <label className='label' >title</label>
            <input type='text' className='inputBox' defaultValue={edit ? selector4.title : ""} onChange={(e) => setTemp(e.target.value)} ></input>
            <label className='label'>body</label>
            <input type='text' className='inputBox' defaultValue={edit ? selector4.body : ""} onChange={(e) => setTemp2(e.target.value)}></input>
            <label className='label'>ID</label>
            <input type='text' className='inputBox' defaultValue={edit ? selector4.id : ""} onChange={(e) => setTemp3(e.target.value)}></input>
          </form>

          <div>
            <button className='popupAdd' onClick={() => update()}>update</button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;

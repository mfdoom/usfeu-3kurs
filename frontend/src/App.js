import "./styles.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { config } from "./config"
axios.defaults.baseURL = config.CALLBACK_URL
axios.defaults.withCredentials = true

function App() {
  let DateDay
  function getCurrentDate() {
    let newDate = new Date().getDate()
    DateDay = newDate
  }

  getCurrentDate()

  const vkFunc = () => {
    window.open(`${config.CALLBACK_URL}auth/vk`, "_self")
  }

  const logout = () => {
    let c = window.confirm("Выход?")
    if (c) {
      window.open(`${config.CALLBACK_URL}logout`, "_self")
    }
  }

  const [user, setUser] = useState({})
  const [disc, setDisc] = useState([])
  const [test, setTest] = useState({ test: "test" })

  function getRaspEffect() {
    fetch(`${config.CALLBACK_URL}api/rasp`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json()
        throw new Error("Аутентификация не пройдена.")
      })
      .then((resObject) => {
        setDisc(resObject)
      })
      .catch((err) => {})
  }

  useEffect(() => {
    const getUser = () => {
      fetch(`${config.CALLBACK_URL}auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json()
          throw new Error("authentication has been failed!")
        })
        .then((resObject) => {
          setUser(resObject)
        })
        .catch((err) => {})
    }

    getUser()
  }, [])

  useEffect(() => {
    const getRasp = () => {
      fetch(`${config.CALLBACK_URL}api/rasp`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json()
          throw new Error("Аутентификация не пройдена.")
        })
        .then((resObject) => {
          setDisc(resObject)
        })
        .catch((err) => {})
    }

    getRasp()
  }, [])

  useEffect(() => {
    getRaspEffect()
  }, [test])

  //

  const changeDiscNameById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/rasp/${_id}`, {
        name: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const changeTimeById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/rasp/${_id}`, {
        time: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const changeAudById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/rasp/${_id}`, {
        aud: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  //

  let checkDisciplesByDay = (daynumber) => {
    let filteredArr = disc.filter((value) => {
      return value.id === daynumber
    })
    let result = filteredArr.map((item, index) => {
      return item.disciples.map((i, ind) => {
        return i.name?.length > 1 ? (
          <React.Fragment key={ind}>
            <div className="event">
              <div
                onClick={() => window.confirm(`Удалить ${i.name} ?`)}
                className="delete"
              >
                X
              </div>
              <div
                onClick={() => {
                  if (user?.displayName.length === 0) {
                    return null
                  }
                  let dispNameInput = prompt("", i.name)
                  if (dispNameInput === null) {
                    return
                  } else changeDiscNameById(i._id, dispNameInput, "name")
                }}
                className={
                  i.name.toLowerCase().includes("зачет") ||
                  i.name.toLowerCase().includes("экз")
                    ? "event-desc ex"
                    : "event-desc"
                }
              >
                {i.name}
              </div>

              <div
                onClick={() => {
                  if (user?.displayName.length === 0) {
                    return null
                  }
                  let inp = prompt("", i.time)
                  if (inp === null) {
                    return
                  }
                  if (inp.trim().length === 0) {
                    return
                  } else changeTimeById(i._id, inp, "time")
                }}
                className="event-time"
              >
                {i.time}
                <div
                  onClick={(e) => {
                    e.stopPropagation()
                    if (user?.displayName.length === 0) {
                      return null
                    }
                    let inp = prompt("", i.aud)
                    if (inp === null) {
                      return
                    }
                    if (inp.trim().length === 0) {
                      return
                    } else changeAudById(i._id, inp, "aud")
                  }}
                  className="aud"
                >
                  {i.aud}
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          ""
        )
      })
    })
    return result
  }

  function generateDayCells1() {
    const cells = []
    for (let i = 6; i < 13; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div className="add" onClick={() => alert("Добавить")}>
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    return cells
  }
  function generateDayCells2() {
    const cells = []
    for (let i = 13; i < 20; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div className="add" onClick={() => alert("Добавить")}>
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    return cells
  }

  function generateDayCells3() {
    const cells = []
    for (let i = 20; i < 27; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div className="add" onClick={() => alert("Добавить")}>
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    return cells
  }

  function generateDayCells4() {
    const cells = []
    for (let i = 27; i < 31; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div className="add" onClick={() => alert("Добавить")}>
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    return cells
  }

  return (
    <div className="App">
      <header className="App-header">
        <a
          onClick={user?.displayName ? logout : vkFunc}
          className="link"
          style={{}}
        >
          <div
            style={{
              background: "rgb(25 107 191)",
              display: "flex",
              alignItems: "center",
              padding: " 2px 12px",
              borderRadius: " 4px",
            }}
          >
            <div
              className="studentname"
              style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              {user?.displayName ? user.displayName : "Логин через"}
            </div>
            <i
              className="logovk"
              style={{
                display: "flex",
                width: "24px",
                height: " 24px",
                marginLeft: "5px",
                backgroundImage: "url('../webdev/img/vk.png')",
                backgroundPosition: "-1px 1px",
                borderRadius: "50%",
                border: "1px solid rgb(84 144 217)",
              }}
            ></i>
          </div>
        </a>

        <table id="calendar">
          <caption>ИЦЭ-31з зимняя сессия(2023)</caption>
          <tbody>
            <tr className="weekdays">
              <th scope="col">Понедельник</th>
              <th scope="col">Вторник</th>
              <th scope="col">Среда</th>
              <th scope="col">Четверг</th>
              <th scope="col">Пятница</th>
              <th scope="col">Суббота</th>
              <th scope="col">Воскресенье</th>
            </tr>
            <tr className="days">{generateDayCells1()}</tr>
            <tr className="days">{generateDayCells2()}</tr>
            <tr className="days">{generateDayCells3()}</tr>
            <tr className="days">{generateDayCells4()}</tr>
          </tbody>
        </table>
      </header>
    </div>
  )
}

export default App

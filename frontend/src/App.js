import "./styles.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { config } from "./config"
axios.defaults.baseURL = config.CALLBACK_URL
axios.defaults.withCredentials = true

function App() {
  let DateDay

  const [user, setUser] = useState({})
  const [disc, setDisc] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeGroup, setActiveGroup] = useState("itze")

  const [test, setTest] = useState({ test: "test" })

  const loggedInUser = localStorage.getItem("user")
  const foundUser = JSON.parse(loggedInUser)

  function getCurrentDate() {
    let newDate = new Date().getDate()
    DateDay = newDate
  }

  getCurrentDate()

  const vkFunc = () => {
    window.open(`${config.CALLBACK_URL}auth/vk`, "_self")
  }

  const handleLogout = () => {
    localStorage.clear()
  }

  const logout = () => {
    let c = window.confirm("Выход?")
    if (c) {
      handleLogout()
      window.open(`${config.CALLBACK_URL}logout`, "_self")
    }
  }

  const checkActiveGroup = () => {
    return activeGroup === "itze" ? "rasp" : "app"
  }

  function getRaspEffect() {
    fetch(`${config.CALLBACK_URL}api/${checkActiveGroup()}`, {
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
        const prom = new Promise((resolve) => {
          const sortedData = resObject.map((item) => {
            const sortedDisciples = item.disciples.sort((a, b) => {
              const timeA = a.time.replace("-", "")
              const timeB = b.time.replace("-", "")
              return timeA - timeB
            })

            return { ...item, disciples: sortedDisciples }
          })
          resolve(sortedData)
        })

        prom.then((res) => {
          setDisc(res)
        })
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
          localStorage.setItem("user", JSON.stringify(resObject))
        })
        .catch((err) => {})
    }

    if (!foundUser) {
      getUser()
    } else {
      setUser(foundUser)
    }
    console.log("made by Токмянин Л.И. (ИЦЭ-31з)")
  }, [])

  useEffect(() => {
    getRaspEffect()
  }, [test])

  //

  useEffect(() => {
    const handleChangeGroup = () => {
      setLoading(true)
      fetch(`${config.CALLBACK_URL}api/${checkActiveGroup()}`, {
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
          const prom = new Promise((resolve) => {
            const sortedData = resObject.map((item) => {
              const sortedDisciples = item.disciples.sort((a, b) => {
                const timeA = a.time.replace("-", "")
                const timeB = b.time.replace("-", "")

                return timeA - timeB
              })

              return { ...item, disciples: sortedDisciples }
            })
            resolve(sortedData)
          })

          prom.then((res) => {
            setDisc(res)
            setLoading(false)
          })
        })
        .catch((err) => {})
    }
    handleChangeGroup()
  }, [activeGroup])

  const changeDiscNameById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/${checkActiveGroup()}/${_id}`, {
        name: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {})
  }

  const changeTimeById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/${checkActiveGroup()}/${_id}`, {
        time: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {})
  }

  const changeAudById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/${checkActiveGroup()}/${_id}`, {
        aud: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {})
  }

  const deleteDiscById = (id, disc_id) => {
    axios
      .post(`${config.CALLBACK_URL}api/${checkActiveGroup()}/delete/${id}`, {
        id: id,
        disc_id: disc_id,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {})
  }

  const pushDiscInfo = (dayid, name, time, aud) => {
    axios
      .post(`${config.CALLBACK_URL}api/${checkActiveGroup()}/push/${dayid}`, {
        name,
        time,
        aud,
      })
      .then((resObject) => {
        setTest({ test: "test" })
      })
      .catch((e) => {})
  }

  let checkDisciplesByDay = (daynumber) => {
    let filteredArr = disc.filter((value) => {
      return value.id === daynumber
    })
    let result = filteredArr.map((item, index) => {
      return item.disciples.map((i, ind) => {
        return i.name?.length > 0 ? (
          <React.Fragment key={ind}>
            <div className="event">
              <div
                onClick={() => {
                  if (user?.displayName.length === 0) {
                    return null
                  }
                  let conf = window.confirm(`Удалить ${i.name} ?`)
                  if (conf) {
                    deleteDiscById(item._id, i._id)
                  }
                }}
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
                  if (dispNameInput.trim().length === 0) {
                    return
                  } else changeDiscNameById(i._id, dispNameInput, "name")
                }}
                className={
                  i.name.toLowerCase().includes("зачет") ||
                  i.name.toLowerCase().includes("экз")
                    ? "event-desc ex"
                    : i.name.toLowerCase().includes("подгруппа")
                    ? "event-desc grouping"
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

  function showPrompts(i) {
    let name = prompt("Введите название:")
    if (name === null) {
      return
    }

    let time = prompt("Введите время:")
    if (time === null) {
      return
    }

    let aud = prompt("Введите аудиторию:")
    if (aud === null) {
      return
    }
    pushDiscInfo(i, name, time, aud)
  }

  function generateDayCells1() {
    const cells = []
    for (let i = 8; i < 15; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div
            className="add"
            onClick={() => {
              if (user?.displayName.length === 0) {
                return null
              }

              showPrompts(i)
            }}
          >
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
    for (let i = 15; i < 22; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div
            className="add"
            onClick={() => {
              if (user?.displayName.length === 0) {
                return null
              }

              showPrompts(i)
            }}
          >
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
    for (let i = 22; i < 29; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div
            className="add"
            onClick={() => {
              if (user?.displayName.length === 0) {
                return null
              }

              showPrompts(i)
            }}
          >
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
    for (let i = 29; i < 31; i++) {
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div
            className="add"
            onClick={() => {
              if (user?.displayName.length === 0) {
                return null
              }

              showPrompts(i)
            }}
          >
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    for (let i = 2; i < 6; i++) {
      cells[5] = (
        <td key={1} className={DateDay === 1 ? "day today" : "day"}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/2SUwOgmvzK4"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </td>
      )
      cells.push(
        <td key={i} className={DateDay === i ? "day today" : "day"}>
          <div className="date">{i}</div>
          <div
            className="add"
            onClick={() => {
              if (user?.displayName.length === 0) {
                return null
              }

              showPrompts(i)
            }}
          >
            +
          </div>
          {checkDisciplesByDay(i)}
        </td>
      )
    }
    return cells
  }

  const checkBg = () => {
    return foundUser
      ? `url(${foundUser.photos[0].value})`
      : "url('../webdev/img/vkround.png')"
  }

  return (
    <div className="App">
      <section className="app-content">
        <a
          onClick={user?.displayName ? logout : vkFunc}
          className="link"
          style={{}}
        >
          <div
            className="logospan"
            style={{
              background: "#2287ee",
              display: "flex",
              alignItems: "center",
              padding: "2px 12px",
              maxHeight: "24px",
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
                width: "25px",
                height: "25px",
                marginLeft: "5px",
                backgroundImage: checkBg(),
                backgroundSize: "contain",
                borderRadius: "50%",
              }}
            ></i>
          </div>
        </a>
        {loading ? (
          <div className="loading">Запрос данных</div>
        ) : (
          <>
            <div className="title">
              <div
                onClick={() => setActiveGroup("itze")}
                className={
                  activeGroup === "itze" ? "groupname active itze" : "groupname"
                }
              >
                ИЦЭ-31з
              </div>
              <div
                onClick={() => setActiveGroup("app")}
                className={
                  activeGroup === "app" ? "groupname active app" : "groupname"
                }
              >
                АПП-31з
              </div>
            </div>
            <table id="calendar">
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
          </>
        )}
      </section>
    </div>
  )
}

export default App

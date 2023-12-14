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
    window.open(`${config.CALLBACK_URL}logout`, "_self")
  }

  const [user, setUser] = useState({})
  const [disc, setDisc] = useState([])

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

  // useEffect(() => {
  //   setFilteredData(projectData.filter((data) => data.category === category));
  // }, [category, projectData]);

  // const handleCategory = (res) => {
  //   setCategory(res.data);
  // };

  function checkDisciplesByDay(daynumber) {
    let filteredArr = disc.filter((value) => {
      return value.id === daynumber
    })
    let result = filteredArr.map((item) => {
      return item.disciples.map((i, ind) => {
        return i.name?.length > 1 ? (
          <div key={ind} className="event">
            <div
              onClick={() => {
                if (user?.displayName.length === 0) {
                  return null
                }
                let dispNameInput = prompt("", i.name)
                if (dispNameInput === null) {
                  return
                }
                if (dispNameInput.trim().length === 0) {
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
        ) : (
          ""
        )
      })
    })
    return result
  }

  const changeDiscNameById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/rasp/${_id}`, {
        name: nameInput,
        purpose: purpose,
      })
      .then((resObject) => {
        setDisc(resObject.data)
        console.log(disc)
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
      .then(function (response) {
        // console.log(response)
        // refreshRasp()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const changeAudById = (_id, nameInput, purpose) => {
    axios
      .post(`${config.CALLBACK_URL}api/rasp/${_id}`, {
        aud: nameInput,
        purpose: purpose,
      })
      .then(function (response) {
        // console.log(response)
        // refreshRasp()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
        <a onClick={vkFunc} className="link" style={{}}>
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
                backgroundImage: "url('../img/vk.png')",
                backgroundPosition: "-1px 1px",
                borderRadius: "50%",
                border: "1px solid #d1d1d1",
                borderStyle: "dashed",
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
            <tr className="days">
              <td className={DateDay === 6 ? "day today" : "day"}>
                {checkDisciplesByDay(6)}
              </td>
              <td className={DateDay === 7 ? "day today" : "day"}>
                <div className="date">7</div>
                {checkDisciplesByDay(7)}
              </td>
              <td className={DateDay === 8 ? "day today" : "day"}>
                <div className="date">8</div>
                {checkDisciplesByDay(8)}
              </td>
              <td className={DateDay === 9 ? "day today" : "day"}>
                <div className="date">9</div>
                {checkDisciplesByDay(9)}
              </td>
              <td className={DateDay === 10 ? "day today" : "day"}>
                <div className="date">10</div>
                {checkDisciplesByDay(10)}
              </td>

              <td className={DateDay === 11 ? "day today" : "day"}>
                <div className="date">11</div>
                {checkDisciplesByDay(11)}
              </td>
              <td className={DateDay === 12 ? "day today" : "day"}>
                <div className="date">12</div>
                {checkDisciplesByDay(12)}
              </td>
            </tr>
            <tr>
              <td className={DateDay === 13 ? "day today" : "day"}>
                <div className="date">13</div>
                {checkDisciplesByDay(13)}
              </td>
              <td className={DateDay === 14 ? "day today" : "day"}>
                <div className="date">14</div>
                {checkDisciplesByDay(14)}
              </td>
              <td className={DateDay === 15 ? "day today" : "day"}>
                <div className="date">15</div>
                {checkDisciplesByDay(15)}
              </td>
              <td className={DateDay === 16 ? "day today" : "day"}>
                <div className="date">16</div>
                {checkDisciplesByDay(16)}
              </td>
              <td className={DateDay === 17 ? "day today" : "day"}>
                <div className="date">17</div>
                {checkDisciplesByDay(17)}
              </td>
              <td className={DateDay === 18 ? "day today" : "day"}>
                <div className="date">18</div>

                {checkDisciplesByDay(18)}
              </td>
              <td className={DateDay === 19 ? "day today" : "day"}>
                <div className="date">19</div>
                {checkDisciplesByDay(19)}
              </td>
            </tr>
            <tr>
              <td className={DateDay === 20 ? "day today" : "day"}>
                <div className="date">20</div>
                {checkDisciplesByDay(20)}
                {/* <iframe
                style={{
                  border: "5px solid #24aee1",
                  borderRadius: "10px",
                  margin: "auto",
                }}
                id="ytplayer"
                type="text/html"
                width="200"
                height="160"
                src="https://www.youtube.com/embed/lrDX_Tg4HE0?autoplay=0&origin=https://usfeu-itse.herokuapp.com/"
                frameborder="0"
              /> */}
              </td>
              <td className={DateDay === 21 ? "day today" : "day"}>
                <div className="date">21</div>
                {checkDisciplesByDay(21)}
              </td>
              <td className={DateDay === 22 ? "day today" : "day"}>
                <div className="date">22</div>
                {checkDisciplesByDay(22)}
              </td>
              <td className={DateDay === 23 ? "day today" : "day"}>
                <div className="date">23</div>
                {checkDisciplesByDay(23)}
              </td>
              <td className={DateDay === 24 ? "day today" : "day"}>
                <div className="date">24</div>
                {checkDisciplesByDay(24)}
              </td>
              <td className={DateDay === 25 ? "day today" : "day"}>
                <div className="date">25</div>
                {checkDisciplesByDay(25)}
              </td>
              <td className={DateDay === 26 ? "day today" : "day"}>
                <div className="date">26</div>
                {checkDisciplesByDay(26)}
              </td>
            </tr>
            <tr>
              <td className={DateDay === 27 ? "day today" : "day"}>
                <div className="date">27</div>
                {checkDisciplesByDay(27)}
                {/* <iframe
                style={{
                  border: "5px solid #24aee1",
                  borderRadius: "10px",
                  margin: "auto",
                }}
                id="ytplayer"
                type="text/html"
                width="200"
                height="160"
                src="https://www.youtube.com/embed/lrDX_Tg4HE0?autoplay=0&origin=https://usfeu-itse.herokuapp.com/"
                frameborder="0"
              /> */}
              </td>
              <td className={DateDay === 28 ? "day today" : "day"}>
                <div className="date">28</div>
                {checkDisciplesByDay(28)}
              </td>
              <td className={DateDay === 29 ? "day today" : "day"}>
                <div className="date">29</div>
                {checkDisciplesByDay(29)}
              </td>
              <td className={DateDay === 30 ? "day today" : "day"}>
                <div className="date">30</div>
                {checkDisciplesByDay(30)}
              </td>
              <td className={DateDay === 1 ? "day today" : "day"}>
                <div className="date">1</div>
                {checkDisciplesByDay(1)}
              </td>
              <td className={DateDay === 2 ? "day today" : "day"}>
                <div className="date">2</div>
                {checkDisciplesByDay(2)}
              </td>
              <td className={DateDay === 3 ? "day today" : "day"}>
                <div className="date">3</div>
                {checkDisciplesByDay(3)}
              </td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  )
}

export default App

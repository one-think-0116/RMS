
import React , { useEffect, useState,useContext }from "react";
import {
  Grid,
  Button
} from '@material-ui/core';
import { DragDropContext,Droppable,Draggable   } from 'react-beautiful-dnd';
// components
import PageTitle from "../../components/PageTitle";
import Widget from "../../components/Widget";
import "../users/style.css"
import UserCard from "./components/userCard";
import Modal from 'react-awesome-modal';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { useLoading, ThreeDots} from '@agney/react-loading';
import SweetAlert from 'react-bootstrap-sweetalert';
import { CircularProgressWithLabel } from "../../components/CircularProgressWithLabel"

import { useSelector, useDispatch } from "react-redux";
import { FirebaseContext } from '../../redux';

// const finalUsers = [
//   {
//     id: 'h',
//     club:"Bronze",
//     teamName:"Arizona",
//     name: 'Jeff Stover',
//     email: 'onethink016@gmail.com',
//     systemNumber: 'AZ/TX',
//     evaluationDate:"12/31/20",
//     lastQtrlySales:6,
//     nextEvaluationDate:"3/31/21",
//     allow:true,
//     other:""
//   },
// ]
let deletedUserUid;
let selectedUserEmail;
const sweetAlertStyle = { display: "block", marginTop: "-100px" }
export default function Users() {

  const { api } = useContext(FirebaseContext);
  const {
    updateUsers,
    updateCalculatorRefAdder,
    deleteUsers
    } = api;
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots width="50" />,
  });
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = React.useState(true);
  const [characters, updateCharacters] = useState([]);
  const [team, setTeam] = React.useState('Arizona');
  const [updateFlag, setUpdateFlag] = React.useState(false);
  const [visible,setModal] = useState(false);
  const [name,setName] = useState("");
  const [systemNumber,setSystemNumber] = useState('TX');
  const [evaluationDate,setEvaluationDate] = useState("");
  const [lastQtrlySales,setLastQtrlySales] = useState("");
  const [nextEvaluationDate,setNextEvaluationDate] = useState("");
  const [other,setOther] = useState("");
  const [dropInfo,setDropInfo] = useState({});
  const [alert,setAlert] = React.useState(null);


  const openModal = () => {
   setModal(true);
  }

  const cancelModal = (e) => {
    const items = Array.from(characters);
    if(updateFlag){

    }
    else
    {
      const [reorderedItem] = items.splice(dropInfo.source.index, 1);
      reorderedItem.club = dropInfo.source.droppableId;
      if(dropInfo.source.droppableId === "Pending") reorderedItem.allow = false;
      items.splice(dropInfo.destination.index, 0, reorderedItem);
    }
    setUpdateFlag(false);
    setModal(false);
    updateCharacters(items);
  }
  const okModal = (e) => {

    const items = Array.from(characters);
    if(updateFlag){
      characters.map((item) => {
        if(item.email === selectedUserEmail){
          item.teamName = team;
          item.systemNumber = systemNumber;
          if(typeof evaluationDate === "object"){
            item.evaluationDate = evaluationDate.toLocaleDateString();
          }
          else item.evaluationDate = evaluationDate;
          item.lastQtrlySales = lastQtrlySales;
          if(typeof nextEvaluationDate === "object")
          item.nextEvaluationDate = nextEvaluationDate.toLocaleDateString();
          else item.nextEvaluationDate = nextEvaluationDate;
          item.other = other;
          
          save(item);
        }
      })
      setUpdateFlag(false);
    }
    else
    {
      const [reorderedItem] = items.splice(dropInfo.source.index, 1);
      reorderedItem.club = dropInfo.destination.droppableId
      reorderedItem.teamName = team;
      reorderedItem.systemNumber = systemNumber;
      if(typeof evaluationDate === "object"){
        reorderedItem.evaluationDate = evaluationDate.toLocaleDateString();
      }
      else reorderedItem.evaluationDate = evaluationDate;
      reorderedItem.lastQtrlySales = lastQtrlySales;
      if(typeof nextEvaluationDate === "object")
      reorderedItem.nextEvaluationDate = nextEvaluationDate.toLocaleDateString();
      else reorderedItem.nextEvaluationDate = nextEvaluationDate;
      reorderedItem.other = other;
      items.splice(dropInfo.destination.index, 0, reorderedItem);
      save(reorderedItem);
    }
    updateCharacters(items);
    setModal(false);
  }
  const save = (data) => {
    const {uid,...saveData} = data;
    dispatch(updateUsers(uid,saveData));
    var cData = {C3:saveData.systemNumber,C5:saveData.name,C6:saveData.club,allow:saveData.allow};
    dispatch(updateCalculatorRefAdder(uid,cData));
  }
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    if(result.destination.droppableId === "Pending"){
      reorderedItem.allow = false;
      reorderedItem.teamName = "Pending"
      reorderedItem.systemNumber = "";
      reorderedItem.club = result.destination.droppableId;
      items.splice(result.destination.index, 0, reorderedItem);
      updateCharacters(items);
      save(reorderedItem);
      console.log("p",items);
    }else{
      reorderedItem.allow = true;
      if(reorderedItem.teamName === "Pending") {setTeam("Arizona");setSystemNumber("TX")}
      else {setTeam(reorderedItem.teamName);
      setSystemNumber(reorderedItem.systemNumber)}
      setName(reorderedItem.name)
      setEvaluationDate(reorderedItem.evaluationDate)
      setLastQtrlySales(reorderedItem.lastQtrlySales)

      setNextEvaluationDate(reorderedItem.nextEvaluationDate)
      setOther(reorderedItem.other);
      setDropInfo(result);
      openModal();
    }
  }
  const systemChange = (event) => {
    setSystemNumber(event.target.value);
  }
  const evaluationDateChange = (event) => {
    setEvaluationDate(event.target.value)
  }
  const nextEvaluationDateChange = (event) => {
    setNextEvaluationDate(event.target.value)
  }
  const teamChange = (event) => {
    setTeam(event.target.value);
  };
  const salesChange = (event) => {
    setLastQtrlySales(event.target.value);
  };
  const otherChange = (event) => {
    setOther(event.target.value);
  };
  const update = (e) => {
    // console.log("update")
    setUpdateFlag(true);
    let updateItem = {}; 
    characters.map((item) => {
      if(item.id === e.target.id){
        updateItem = item;
      }
    })
    selectedUserEmail = updateItem.email;
    if(updateItem.teamName === "Pending") setTeam("Pending")
    else setTeam(updateItem.teamName)
    setName(updateItem.name)
    setEvaluationDate(updateItem.evaluationDate)
    setLastQtrlySales(updateItem.lastQtrlySales)
    setSystemNumber(updateItem.systemNumber)
    setNextEvaluationDate(updateItem.nextEvaluationDate)
    setOther(updateItem.other);
    // console.log(updateItem)
    openModal();
  }
  useEffect(() => {
    if(users.info){
      var usersdata = users.info;
      var id = 0;
      const uData = Object.keys(usersdata).
                    map((i) => {
                      id++;
                      usersdata[i].id = id.toString();
                      usersdata[i].uid = i;
                      return usersdata[i]
                    })
      updateCharacters(uData)
      setLoading(false);
    }
  }, [users.info])
  
  const deleteUser = (e) => {
    deletedUserUid = e.target.id;
    setAlert(
      <SweetAlert
      danger
      showCancel
      confirmBtnText="Yes, delete it!"
      confirmBtnBsStyle="delete"
      title="Are you sure?"
      onConfirm={deleteRequest}
      onCancel={deleteCancel}
      focusCancelBtn
      >
      You will not be able to recover this user(<b>{e.target.name}</b>).
    </SweetAlert>
    );
  }
  const deleteRequest = () => {
    setAlert(null)
    setAlert(
      <SweetAlert
        title={""}
        onConfirm={() => {}}
        showConfirm={false}
      >
        <CircularProgressWithLabel value={30} />
      </SweetAlert>)
      dispatch(deleteUsers(deletedUserUid))
                setAlert(
                <SweetAlert success title="Deleted" onConfirm={deletedConfirm}>
                  The user has been deleted.
                </SweetAlert>)
    // var usersDBRef = firebase.firestore().collection("users");
    // var calculatorsDBRef = firebase.firestore().collection("calculators");
    // var addersDBRef = firebase.firestore().collection("adders");
    // console.log("email",deletedUserEmail)
    // calculatorsDBRef.where("email" ,"==", deletedUserEmail).get().then((querySnapshot) => {
    //   var docs = querySnapshot.docs;
    //   calculatorsDBRef.doc(docs[0].id).delete().then((result) => {
    //     // setAlert(null)
    //     setAlert(
    //       <SweetAlert
    //         title={""}
    //         onConfirm={() => {}}
    //         showConfirm={false}
    //       >
    //         <CircularProgressWithLabel value={60} />
    //       </SweetAlert>)
    //     addersDBRef.where("email" ,"==", deletedUserEmail).get().then((querySnapshot) => {
    //       var docs = querySnapshot.docs;
    //       addersDBRef.doc(docs[0].id).delete().then((result) => {
    //         // setAlert(null)
    //         setAlert(
    //           <SweetAlert
    //             title={""}
    //             onConfirm={() => {}}
    //             showConfirm={false}
    //           >
    //             <CircularProgressWithLabel value={100} />
    //           </SweetAlert>)
    //         usersDBRef.where("email" ,"==", deletedUserEmail).get().then((querySnapshot) => {
    //           var docs = querySnapshot.docs;
    //           usersDBRef.doc(docs[0].id).delete().then((result) => {
    //             const newCharacters = [];
    //             characters.forEach(item => {
    //               if(item.email !== deletedUserEmail) newCharacters.push(item);
    //             })
    //             updateCharacters(newCharacters);
    //             setAlert(
    //             <SweetAlert success title="Deleted" onConfirm={deletedConfirm}>
    //               The user has been deleted.
    //             </SweetAlert>
    //             )
    //           })
    //         })
    //       })
    //     })
    //   })
    // })
  }
  const deleteCancel = () => {
    setAlert(null)
  }
  const deletedConfirm = () => {
    setAlert(null)
  }
  return (
    <>
     {loading ?    
            <section {...containerProps} style={{textAlign:"center",marginTop:window.innerHeight/2 - 100}}>
                {indicatorEl} {/* renders only while loading */}
            </section> :
            <>
            {alert}
            <PageTitle title="" />
            <Grid container spacing={4}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="Chairman">
                {(provided) => (
                      <>
                      <Grid item lg={3} md={6} sm={6} xs={12} {...provided.droppableProps} ref={provided.innerRef}>
                        <Widget title="Chairman Club">
                        <ul  {...provided.droppableProps} ref={provided.innerRef} style={{listStyleType:"none",padding:"1%"}}>
                          {characters.map((item, index) => {
                            if(item.allow && item.club === "Chairman"){
                                    return (
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <UserCard info={item} update={update} deleteUser={deleteUser}/>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  }
                                })}
                          </ul>
                        </Widget>
                        {provided.placeholder}
                      </Grid>
                      </>
                    )}
                </Droppable>
                <Droppable droppableId="Silver">
                {(provided) => (
                      <>
                      <Grid item lg={3} md={6} sm={6} xs={12} {...provided.droppableProps} ref={provided.innerRef}>
                        <Widget title="Silver Club">
                        <ul  {...provided.droppableProps} ref={provided.innerRef} style={{listStyleType:"none",padding:"1%"}}>
                          {characters.map((item, index) => {
                            if(item.allow && item.club === "Silver"){
                                    return (
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <UserCard info={item} update={update} deleteUser={deleteUser}/>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  }
                                })}
                          </ul>
                        </Widget>
                        {provided.placeholder}
                      </Grid>
                      </>
                    )}
                </Droppable>
                <Droppable droppableId="Bronze">
                {(provided) => (
                      <>
                      <Grid item lg={3} md={6} sm={6} xs={12} {...provided.droppableProps} ref={provided.innerRef}>
                        <Widget title="Bronze Club">
                        <ul  {...provided.droppableProps} ref={provided.innerRef} style={{listStyleType:"none",padding:"1%"}}>
                          {characters.map((item, index) => {
                            if(item.allow && item.club === "Bronze"){
                                    return (
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <UserCard info={item} update={update} deleteUser={deleteUser}/>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  }
                                })}
                          </ul>
                        </Widget>
                        {provided.placeholder}
                      </Grid>
                      </>
                    )}
                </Droppable>
                <Droppable droppableId="Pending">
              {(provided) => (
                      <>
                      <Grid item lg={3} md={6} sm={6} xs={12}  {...provided.droppableProps} ref={provided.innerRef}>
                        <Widget title="Pending">
                          <ul  {...provided.droppableProps} ref={provided.innerRef} style={{listStyleType:"none",padding:"1%"}}>
                          {characters.map((item, index) => {
                            if(!item.allow){
                                    return (
                                      <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} >
                                            <UserCard info={item} update={update} deleteUser={deleteUser}/>
                                          </li>
                                        )}
                                      </Draggable>
                                    );
                                  }
                                })}
                          </ul>
                        </Widget>
                        {provided.placeholder}
                      </Grid>
                      </>
                    )}
                </Droppable>
              </DragDropContext>
            </Grid>
            <Modal 
                visible={visible}
                width="400"
                height="400"
                effect="fadeInUp"
                // onClickAway={() => closeModal()}
            >
                <div>
                    <h1 className="center" id="username">{name}</h1>
                    <div style={{display:"flex",marginTop:50}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                        Select the team
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                      <select
                          name="team"
                          value={team}
                          onChange={teamChange}
                          style={{textAlign: "center",width:"75%"}}
                        >
                          <option value={"Arizona"}>Arizona Team</option>
                          <option value={"Texas"}>Texas Team</option>
                        </select>
                      </Grid>        
                    </div>           
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                          System Number
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <select
                          name="systemNumber"
                          value={systemNumber}
                          onChange={systemChange}
                          style={{textAlign: "center",width:"75%"}}
                        >
                          <option value={"TX"}>TX</option>
                          <option value={"AZ"}>AZ</option>
                          <option value={"AZ/TX"}>AZ/TX</option>
                          <option value={"AZ/TX - remote"}>AZ/TX - remote</option>
                          <option value={"Remote (exiting)"}>Remote (exiting)</option>
                        </select>
                      </Grid>        
                    </div>
                    
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                          Evaluation Date
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <DatePicker value={new Date(evaluationDate)} id="evaluationDate" defaultShow={false} onChange={evaluationDateChange}/>
                      </Grid>        
                    </div>
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                        Last Qtrly Sales
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <input type="text" defaultValue={lastQtrlySales} onChange={ salesChange} style={{width:"75%"}}/>
                      </Grid>        
                    </div>
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                        Next Evaluation Date
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <DatePicker value={new Date(nextEvaluationDate)} defaultShow={false} onChange={nextEvaluationDateChange} style={{width:"75%"}}/>
                      </Grid>        
                    </div>
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                        Other
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <input type="text" defaultValue={other}  onChange={ otherChange}  style={{width:"75%"}}/>
                      </Grid>        
                    </div>
                    <div style={{display:"flex",marginTop:15}}>
                      <Grid item xs={6} style={{textAlign: "center"}}>
                      <Button variant="outlined" color="secondary" onClick={cancelModal}>
                        Cancel
                      </Button>
                      </Grid>
                      <Grid item xs={6}  style={{textAlign: "center"}}>
                        <Button variant="outlined" color="primary" onClick={okModal}>
                          Ok
                        </Button>
                      </Grid>        
                    </div>
                    

                </div>
            </Modal>
      </>
}

    </>
  );
}

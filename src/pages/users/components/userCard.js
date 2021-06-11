import React, { Component } from "react";
import {
  Grid
} from '@material-ui/core';
class UserCard extends Component {

  uppercase = word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  componentDidMount() {
  }
  render() {
    return (
      <div className="clearfix">
        <div className="row">
            <div className="col-md-4 animated fadeIn" key={this.props.info.id}>
              <div className="card ribbon">
                <div className="card-body wrap">
                  <span className={this.props.info.teamName}>{this.props.info.teamName} Team</span>
                  <div className="avatar center" style={{marginTop:"3%"}}>
                    <img
                      src={this.props.info.photoURL}
                      className="card-img-top"
                      alt=""
                    />
                  </div>
                  <h3 className="card-title center" style={{color:"black"}}>
                      Name  :  {this.props.info.name}
                  </h3>
                  <div className="card-text">
                    <p className="phone center">Email   :   {this.props.info.email}</p>
                    <p className="phone center">SystemNumber   :   {this.props.info.systemNumber}</p>
                    <p className="phone center">Evaluation Date   :   {this.props.info.evaluationDate}</p>
                    <p className="phone center">Last Qtrly Sales   :   {this.props.info.lastQtrlySales}</p>
                    <p className="phone center">Next Evaluation Date  :   {this.props.info.nextEvaluationDate}</p>
                    <p className="phone center">Other   :   {this.props.info.other}</p>
                    <Grid item xs={12}  style={{textAlign: "center"}}>
                    <button className="btn" id={this.props.info.id} onClick={this.props.update}  style={{marginRight:15}}> Update User</button>
                    <button className="btn-delete" name={this.props.info.name} id={this.props.info.uid} onClick={this.props.deleteUser}> Delete User</button>
                      {/* <Button variant="outlined" id={this.props.info.id} startIcon={<UpdateIcon />} onClick={this.props.update}>
                        Update {this.props.info.name}
                      </Button> */}
                    </Grid>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default UserCard;

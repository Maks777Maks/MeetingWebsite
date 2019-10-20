import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../../../eclipse';
import Select from 'react-select';

//import Modal from '../../../Notifications/Modals/Modals';

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Container,
  Button,
  Input,
  Pagination, 
  PaginationItem,
  PaginationLink,
  Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

const optionsMonth = [
  
  { value: '1', label: 'Січень' },
  { value: '2', label: 'Лютень' },
  { value: '3', label: 'Березень' },
  { value: '4', label: 'Квітень' },
  { value: '5', label: 'Травень' },
  { value: '6', label: 'Червень' },
  { value: '7', label: 'Липень' },
  { value: '8', label: 'Серпень' },
  { value: '9', label: 'Вересень' },
  { value: '10', label: 'Жовтень' },
  { value: '11', label: 'Листопад' },
  { value: '12', label: 'Грудень' }
];

const optionsYear = [
  { value: '2018', label: '2018р' },
  { value: '2019', label: '2019р' },
  { value: '2020', label: '2020р' },
];

class Modals extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      danger: false,
      temp_id:"",
      temp_description:""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleDanger = this.toggleDanger.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  SetBan=(id)=>
  {
     this.setState({temp_id:id})
  }

  Ban=()=>
  {
    const { temp_id,temp_description} = this.state;
    let id=temp_id;
    let description=temp_description;
    console.log("BAN__________________________________",id,description);
  //  this.props.BanUser({id,description});
  }

  PostFilters = (e) => {
    console.log("BAN222__________________________________",e);
    this.setState({temp_description:e})
  }

  toggleDanger() {
    this.setState({
      danger: !this.state.danger,
    });
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
                <Button color="danger" onClick={this.toggleDanger} className="mr-1">Забанить</Button>
                <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                       className={'modal-danger ' + this.props.className}>
                  <ModalHeader toggle={this.toggleDanger}>Забанить</ModalHeader>
                  <ModalBody>
                    <Input onChange={(e) => this.PostFilters(`${e.target.value}`)} placeholder="Причина"></Input>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" onClick={this.Ban()}>Забанить</Button>{' '}
                    <Button color="info" onClick={this.toggleDanger}>Відміна</Button>
                  </ModalFooter>
                </Modal>
          </Col>
        </Row>
      </div>
    );
  }
}



class Tables extends React.Component {

  state = {
    isLoading: true,
    tmp_NickName: '',
    tmp_month: { value: '1', label: 'Січень' },
    tmp_year: { value: '2019', label: '2019р' },   
  }

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue },this.filterSearchData);
  }


  filterSearchData = () => {
    const { tmp_year,tmp_month,tmp_NickName } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    this.props.getUsersData({ year,month,nickname});
  }

  componentDidMount = () => {
    const { tmp_year,tmp_month,tmp_NickName } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    this.props.getUsersData({ year,month,nickname});
  }

  Click(e)//проблема тут!!!
  {
    e.preventDefault();
    const { tmp_year,tmp_month,tmp_NickName } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    let nickname = tmp_NickName;
    console.log("CLICK__________________________________",tmp_NickName);
    this.props.getUsersData({year,month,nickname})
  }
  PostFilters = (e) => {
    console.log("EEEEEEEE",e);
    this.setState({tmp_NickName:e})
  }

  render() {
    const { tmp_year, tmp_month, tmp_NickName } = this.state;
    const { listUsers, isListLoading } = this.props;
    console.log("---state--------------------------------", this.state);
    console.log("---props--------------------------------", this.props);
    return (
      <>
      {isListLoading && <EclipseWidget />}
      <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                  <Col className="col-md-2">
                  <CardTitle tag="h4">Таблиця користувачів</CardTitle>
                  </Col>
                  <Col className="col-md-2">
                      <Select
                        value={tmp_month}
                        onChange={(e) => this.handleChange("tmp_month", e)}
                        options={optionsMonth} />
                    </Col>
                    <Col className="col-md-2">
                      <Select
                        value={tmp_year}
                        onChange={(e) => this.handleChange("tmp_year", e)}
                        options={optionsYear} />
                    </Col>
                    <Col className="col-md-2">
                      <Input
                        onChange={(e) => this.PostFilters(`${e.target.value}`)}
                        placeholder="Нік"/>
                    </Col>
                    <Col className="col-md-2">
                       <Button onClick={(e)=>this.Click(e)} color='info'>
                        Відправити фільтри
                      </Button>
                    </Col>
                  </Row>                 
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Нікнейм</th>
                        <th>Дата реєстрації</th>
                        <th>Місто</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody className="align-items-center">
                    {
                        listUsers.map(item => {
                          return (<tr key={item.id}>
                            {/* <th scope="row">{counter++}</th> */}
                            <td>{item.nickname}</td>
                            <td>{item.registrdate}</td>
                            <td>{item.city}</td>
                            <td><Modals /*Click={Modals.SetBan(item.id)}*/ color = {item.status==="Не забанений"?"info":"warning"}>{item.status}</Modals></td>
                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
                  <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    listUsers: get(state, "userTable.list.data"),
    isListLoading: get(state, "userTable.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUsersData: filter => {
      dispatch(getListActions.getUsersData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);


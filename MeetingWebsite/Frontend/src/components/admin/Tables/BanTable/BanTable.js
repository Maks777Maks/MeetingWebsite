import React from "react";
import { connect } from 'react-redux';
import get from "lodash.get";
import { push } from 'react-router-redux';
import * as getListActions from './reducer';
import EclipseWidget from '../../../eclipse';
import Select from 'react-select';
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
  Button
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


class Tables extends React.Component {

  state = {
    isLoading: true,
    tmp_month: { value: '01', label: 'Січень' },
    tmp_year: { value: '2019', label: '2019р' },   
  }

  handleChange = (name, selectValue) => {
    this.setState({ [name]: selectValue }, this.filterSearchData);
  }

  filterSearchData = () => {
    const { tmp_month, tmp_year } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    this.props.getBansData({ year, month });
  }

  componentDidMount = () => {
    const { tmp_month, tmp_year } = this.state;
    let year = tmp_year.value;
    let month = tmp_month.value;
    this.props.getBansData({ year, month });
  }

  render() {
    const { tmp_year, tmp_month } = this.state;
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
                  </Row>                 
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Нікнейм</th>
                        <th>Дата бану</th>
                        <th>Причина бану</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody className="align-items-center">
                    {
                        listUsers.map(item => {
                          return (<tr key={item.id}>
                            {/* <th scope="row">{counter++}</th> */}
                            <td>{item.nickname}</td>
                            <td>{item.bandate}</td>
                            <td>{item.description}</td>
                           <td><Button color = {item.status==="Не забанений"?"info":"warning"}>{item.status}</Button></td>
                          </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
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
    getBansData: filter => {
      dispatch(getListActions.getBansData(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tables);

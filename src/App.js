import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import Table from "react-bootstrap/Table";
import Nav from "./navbar";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TR: [],
      lowerBound: 0,
      upperBound: 100,
    };
  }

  componentDidMount() {
    fetch("./returns.json")
      .then((res) => res.json())
      .then((data) => {
        let sortedData = data.sort((a, b) => {
          return a.year - b.year;
        });
        // Sort by year
        this.setState({ TR: sortedData });
        // Set the lower bound
        this.setState({ lowerBound: sortedData[0]["year"] });
        // Set the upper bound
        this.setState({
          upperBound: sortedData[sortedData.length - 1]["year"],
        });
      });
  }

  // Update the lower and upper bound using the slider
  onSliderChange = (value) => {
    this.setState({
      value,
      lowerBound: value[0],
      upperBound: value[1],
    });
  };

  render() {
    // To hold the cumulative sum
    let cumulativeR = 0;

    // To hold the outside object
    let _this = this;

    // Filter the value to be rendered based on the lower and upper bound in the state
    let filteredDataByRange = this.state.TR.filter(function (el) {
      return (
        el.year >= _this.state.lowerBound && el.year <= _this.state.upperBound
      );
    });
    return (
      <div>
        <Nav />
        <div className="container">
          <div className="sliderWrapper">
            <Range
              min={1926}
              max={2019}
              value={[this.state.lowerBound, this.state.upperBound]}
              dual={true}
              onChange={this.onSliderChange}
            />
          </div>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Year</th>
                <th>Total Return</th>
                <th>Cumulative returns</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataByRange.map(
                (data, i) => (
                  // Calculate the cumulative
                  (cumulativeR += parseFloat(data.totalReturn)),
                  (
                    <tr key={i}>
                      <td>{data.year}</td>
                      <td>{data.totalReturn}</td>
                      <td>{cumulativeR.toFixed(2)}</td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default App;

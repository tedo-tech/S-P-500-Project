import React, { Component } from "react";

class navbar extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-md navbar-dark bg-primary">
          <a class="navbar-brand font-italic" href="/">
            SlickCharts
          </a>
        </nav>

        <div className="container">
          <div class="row">
            <div class="col-12">
              <div class="mb-4">
                <br />
                <h3 class="text-center">S&amp;P 500 Total Returns</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default navbar;

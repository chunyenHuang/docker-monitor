import React, { Component } from 'react';
import './App.css';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      currentCount: 0,
      interval: 1000
    }
  }

  componentDidMount(){
    const intervalId = setInterval(()=>{
      fetch('/stats')
        .then((response) => response.json())
        .then((res)=>{
            res.res
            this.setState({
              jobs: res,
              currentCount: this.state.currentCount++
            });
        });
    }, this.state.interval);
    this.setState({ intervalId });
  }

  componentWillUnmount(){
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Docker Monitoring</h2>
        </div>
        <div>
           <table className="monitor-table">
          {this.state.jobs.map((job, index)=>{
            return (
                <tr key={job[0]} >
                  {job.map((item)=>{
                    const key = Math.random()*100;
                    if(index===0){
                      return <th key={key} className="padding">{item}</th>;
                    } else {
                      return <td key={key} className="padding">{item}</td>;
                    }
                  })}
                </tr>
            );
          })}
           </table>

        </div>

      </div>
    );
  }
}

export default App;

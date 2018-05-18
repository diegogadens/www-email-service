
  import React, { Component } from 'react';
  import './style.css';
  import axios from 'axios';

  class App extends Component {
    constructor() {
      super();
      this.state = {
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        message: ''
      };
    }

    onChange = (e) => {
      const state = this.state
      state[e.target.name] = e.target.value;
      this.setState(state);
    }

    onSubmit = (e) => {
      e.preventDefault();
      let email = {}
      let { to, cc, bcc, subject, message } = this.state;

      email.to = to.split(',').map((e) => { return e.trim() });

      if(cc)
        email.cc = cc.split(',').map((e) => { return e.trim() });

      if(bcc)
        email.bcc = bcc.split(',').map((e) => { return e.trim() });

      email.subject = subject;
      email.message = message;

      axios.post('/email', email)
        .then((result) => {
          alert(result.data.message)
        });
    }

    render() {
      const { to, cc, bcc, subject, message } = this.state;
      return (
        <div className="container" style={{width: "60%"}}>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label htmlFor="to">To:</label>
              <input type="text" className="form-control" name="to" placeholder="Comma separated emails" value={to} onChange={this.onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Cc:</label>
              <input type="text" className="form-control" name="cc" placeholder="Comma separated emails" value={cc} onChange={this.onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Bcc:</label>
              <input type="text" className="form-control" name="bcc" placeholder="Comma separated emails" value={bcc} onChange={this.onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Subject:</label>
              <input type="text" className="form-control" name="subject" value={subject} onChange={this.onChange} />
            </div>

            <div className="form-group">
              <label htmlFor="email">Message:</label>
              <textarea className="form-control" rows="5" name="message" value={message} onChange={this.onChange} />
            </div>

            <button className="btn btn-primary" type="submit">Send</button>
          </form>
        </div>
      );
    }
  }

export default App

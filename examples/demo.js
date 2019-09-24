'use strict';

var QRCode = require('..');
var React = require('react');
var ReactDOM = require('react-dom');
var base64 = require('base64-js');

// TODO: live update demo
class Demo extends React.Component {
  state = {
    value: 'http://picturesofpeoplescanningqrcodes.tumblr.com/',
    valueType: 'utf8',
    size: 128,
    fgColor: '#000000',
    bgColor: '#ffffff',
    level: 'L',
    renderAs: 'svg',
    includeMargin: false,
  };

  render() {
    var code = `<QRCode
  value={${
    this.state.valueType === 'utf8'
      ? JSON.stringify(this.state.value)
      : `Uint8Array.of(${Array.from(this.state.value).join(', ')})`
  }}
  size={${this.state.size}}
  bgColor={"${this.state.bgColor}"}
  fgColor={"${this.state.fgColor}"}
  level={"${this.state.level}"}
  includeMargin={${this.state.includeMargin}}
  renderAs={"${this.state.renderAs}"}
/>`;
    return (
      <div>
        <div>
          <label>
            Size(px):
            <br />
            <input
              type="number"
              onChange={(e) =>
                this.setState({size: parseInt(e.target.value, 10) || 0})
              }
              value={this.state.size}
            />
          </label>
        </div>
        <div>
          <label>
            Background Color:
            <br />
            <input
              type="color"
              onChange={(e) => this.setState({bgColor: e.target.value})}
              value={this.state.bgColor}
            />
          </label>
        </div>
        <div>
          <label>
            Foreground Color:
            <br />
            <input
              type="color"
              onChange={(e) => this.setState({fgColor: e.target.value})}
              value={this.state.fgColor}
            />
          </label>
        </div>
        <div>
          <label>
            Error Level:
            <br />
            <select
              onChange={(e) => this.setState({level: e.target.value})}
              value={this.state.level}>
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="Q">Q</option>
              <option value="H">H</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Include Margin:
            <br />
            <input
              type="checkbox"
              checked={this.state.includeMargin}
              onChange={(e) => this.setState({includeMargin: e.target.checked})}
            />
          </label>
        </div>
        <div>
          <label>
            Render As:
            <br />
            <select
              onChange={(e) => this.setState({renderAs: e.target.value})}
              value={this.state.renderAs}>
              <option value="svg">SVG</option>
              <option value="canvas">Canvas</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Value type:
            <br />
            <select
              onChange={(e) => {
                const newValueType = e.target.value;
                this.setState((previousState) => {
                  if (previousState.valueType !== newValueType) {
                    if (newValueType === 'utf8') {
                      return {
                        value: new TextDecoder().decode(previousState.value),
                        valueType: newValueType,
                      };
                    } else {
                      return {
                        value: new TextEncoder().encode(previousState.value),
                        valueType: newValueType,
                      };
                    }
                  }
                });
              }}
              value={this.state.valueType}>
              <option value="utf8">utf8</option>
              <option value="base64">base64</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Value:
            <br />
            <textarea
              rows="6"
              cols="80"
              onChange={(e) =>
                this.setState({
                  value:
                    this.state.valueType === 'utf8'
                      ? e.target.value
                      : base64.toByteArray(e.target.value),
                })
              }
              value={
                this.state.valueType === 'utf8'
                  ? this.state.value
                  : base64.fromByteArray(this.state.value)
              }
            />
          </label>
        </div>

        <div>
          <label>
            Use it:
            <br />
            <textarea rows="6" cols="80" disabled={true} value={code} />
          </label>
        </div>

        <QRCode
          value={this.state.value}
          size={this.state.size}
          fgColor={this.state.fgColor}
          bgColor={this.state.bgColor}
          level={this.state.level}
          renderAs={this.state.renderAs}
          includeMargin={this.state.includeMargin}
        />
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('demo'));

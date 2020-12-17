import React from 'react';
import Bar from './Bar';
import { calculateSalaryFrom } from './salary';
import { formatCurrency, formatPercentage } from './formatter';

class SalaryComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grossSalary: 0.0,
      baseINSS: 0.0,
      discountINSS: 0.0,
      percentageINSS: 0.0,
      baseIRPF: 0.0,
      discountIRPF: 0.0,
      percentageIRPF: 0.0,
      netSalary: 0.0,
      percentageNetSalary: 0.0,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ grossSalary: event.target.value }, () => {
      if (this.state.grossSalary > 0) {
        this.setState(calculateSalaryFrom(this.state.grossSalary));
      } else {
        this.setState({
          baseINSS: 0.0,
          discountINSS: 0.0,
          percentageINSS: 0.0,
          baseIRPF: 0.0,
          discountIRPF: 0.0,
          percentageIRPF: 0.0,
          netSalary: 0.0,
          percentageNetSalary: 0.0,
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <label>Gross Salary: </label>
          <input
            name="grossSalary"
            value={this.state.grossSalary}
            onChange={this.handleChange}
            type="number"
          />
        </div>
        <div>
          <label>Base Inss: </label>
          <input value={formatCurrency(this.state.baseINSS)} readOnly />
        </div>
        <div>
          <label>Deduction Inss: </label>
          <input
            style={{ color: '#e67e22' }}
            value={`${formatCurrency(
              this.state.discountINSS
            )} (${formatPercentage(this.state.percentageINSS)})`}
            readOnly
          />
        </div>
        <div>
          <label>Base Irpf: </label>
          <input value={formatCurrency(this.state.baseIRPF)} readOnly />
        </div>
        <div>
          <label>Deduction Irpf: </label>
          <input
            style={{ color: '#c0392b' }}
            value={`${formatCurrency(
              this.state.discountIRPF
            )} (${formatPercentage(this.state.percentageIRPF)})`}
            readOnly
          />
        </div>
        <div>
          <label>Net Salary: </label>
          <input
            style={{ color: '#16a085' }}
            value={`${formatCurrency(this.state.netSalary)} (${formatPercentage(
              this.state.percentageNetSalary
            )})`}
            readOnly
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          <Bar value={this.state.percentageINSS * 100} color="#e67e22" />
          <Bar value={this.state.percentageIRPF * 100} color="#c0392b" />
          <Bar value={this.state.percentageNetSalary * 100} color="#16a085" />
        </div>
      </div>
    );
  }
}

export default SalaryComponent;

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loop from "../assets/Invest & Return Loop.png";
const Home = () => {
  return (
    <div className="App">
     
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <div className="meaning-name">
              <p>AUTO</p>
              <p>
                <span>INTER</span>
                <span>NET</span>
                <span>WORKING</span>
              </p>
            </div>
            <p>India's Truly Money Double Service</p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="intro">
          <h2>How We Double Your Money - Let's Explain</h2>
          <p>
            In 28 days, you can buy a maximum of 6 Golden & Diamond Funds.
            Here's how:
          </p>
        </section>

        {/* Golden Funds Section */}
        <section className="funds-table">
          <h4>Golden Funds</h4>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Fund</th>
                <th>Count</th>
                <th>Invest</th>
                <th>Time In Average</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Golden</td>
                <td>1</td>
                <td>₹500</td>
                <td>3 months</td>
                <td>₹1000</td>
              </tr>
              <tr>
                <td>Golden</td>
                <td>2</td>
                <td>₹1000</td>
                <td>3 months</td>
                <td>₹2000</td>
              </tr>
              <tr>
                <td>Golden</td>
                <td>3</td>
                <td>₹1500</td>
                <td>3 months</td>
                <td>₹3000</td>
              </tr>
              <tr>
                <td>Golden</td>
                <td>4</td>
                <td>₹2000</td>
                <td>3 months</td>
                <td>₹4000</td>
              </tr>
              <tr>
                <td>Golden</td>
                <td>5</td>
                <td>₹2500</td>
                <td>3 months</td>
                <td>₹5000</td>
              </tr>
              <tr>
                <td>Golden</td>
                <td>6</td>
                <td>₹3000</td>
                <td>3 months</td>
                <td>₹6000</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </section>

        {/* Diamond Funds Section */}
        <section className="funds-table">
          <h4>Diamond Funds</h4>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Fund</th>
                <th>Count</th>
                <th>Invest</th>
                <th>Time In Average</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Diamond</td>
                <td>1</td>
                <td>₹1000</td>
                <td>3 months</td>
                <td>₹2000</td>
              </tr>
              <tr>
                <td>Diamond</td>
                <td>2</td>
                <td>₹2000</td>
                <td>3 months</td>
                <td>₹4000</td>
              </tr>
              <tr>
                <td>Diamond</td>
                <td>3</td>
                <td>₹3000</td>
                <td>3 months</td>
                <td>₹6000</td>
              </tr>
              <tr>
                <td>Diamond</td>
                <td>4</td>
                <td>₹4000</td>
                <td>3 months</td>
                <td>₹8000</td>
              </tr>
              <tr>
                <td>Diamond</td>
                <td>5</td>
                <td>₹5000</td>
                <td>3 months</td>
                <td>₹10000</td>
              </tr>
              <tr>
                <td>Diamond</td>
                <td>6</td>
                <td>₹6000</td>
                <td>3 months</td>
                <td>₹12000</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </section>

        {/* Summary Section */}
        <section className="summary">
          <p>
            <strong>Total return in an average of 3 months: ₹18,000</strong>
          </p>
          <p>
            In every 28 days, you can buy more 6 Golden & Diamond Funds and see
            returns growing automatically.
          </p>
          <figure>
            <img src={Loop} alt="loop png" />
          </figure>
        </section>

        {/* Benefits Section */}
        <section className="benefits">
          <h4>Key Benefits</h4>
          <ul>
            <li>Automatic recharge to given phone numbers</li>
            <li>Send money to any person from your balance</li>
            <li>Track your funds in the Dashboard</li>
            <li>No need to convince or share with anyone</li>
          </ul>
          {/* <h4>Share is Optional</h4>

          <p>if you share with referral link</p>
          <p>
            on per golden fund buy income ₹10 and per diamond fund buy income
            ₹20
          </p> */}
        </section>

        <div className="deeply">
          <Link to={"/deep-things"}>
            Deeply Understand how to do we double your money
          </Link>
        </div>
        {/* Footer */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;

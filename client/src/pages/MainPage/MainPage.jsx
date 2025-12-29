import { useSelector } from "react-redux";
import MainSlider from "../../components/layout/MainSlider/MainSlider";
import "./MainPage.scss";


const MainPage = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  const blockLink = (e) => {
    if (!isAuth) e.preventDefault();
  }

  return (
    <div className="main">
      <MainSlider />
      <div className="main-text-wrapper">
        <div className="main-text">
          <h1 className="main-title">AutoMaster</h1>

          <p className="main-lead">
            AutoMaster is a web application designed to simplify the process of choosing,
            ordering, and testing vehicles.
            <br />
            The platform provides a centralized environment where users can browse
            available cars, submit purchase requests, and schedule test drives without
            visiting a dealership in person.
          </p>

          <div className="main-divider" />

          <div className="main-text-block">
            <h2>How the platform works</h2>

            <p>
              AutoMaster combines a car catalog, request management, and order tracking
              into a single interface. Each user can interact with vehicles, submit
              requests, and monitor their status through a personal account.
            </p>

            <p>
              All actions performed on the platform are stored and processed within
              the system, allowing users to track the progress of their orders and
              test drives in real time.
            </p>
          </div>

          <div className="main-divider" />

          <div className="main-text-block">
            <h2>What you can do</h2>

            <ul>
              <li>Browse a structured catalog of available vehicles</li>
              <li>Submit purchase requests directly through the application</li>
              <li>Schedule test drives by selecting a convenient date and time</li>
              <li>Track the status of all requests in one place</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="main-features">
        <a href="/cars" className="main-feature" onClick={blockLink}>
          <h3>Car Catalog</h3>
          <p>
            Explore a structured catalog of available vehicles with detailed
            information and clear specifications.
          </p>
        </a>

        <a href="/tracking" className="main-feature" onClick={blockLink}>
          <h3>Order Management</h3>
          <p>
            Submit purchase requests and track their status through your personal
            account in real time.
          </p>
        </a>

        <a href="/cars" className="main-feature" onClick={blockLink}>
          <h3>Test Drives</h3>
          <p>
            Schedule test drives by choosing a convenient date and time without
            visiting a dealership.
          </p>
        </a>
      </div>
    </div>
  )
}

export default MainPage;

import PropTypes from "prop-types";
import React, { Component } from "react";

//Simple bar
import SimpleBar from "simplebar-react";

// MetisMenu
import MetisMenu from "metismenujs";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";

class SidebarContent extends Component {
  constructor(props) {
    super(props);
    this.refDiv = React.createRef();
  }

  componentDidMount() {
    this.initMenu();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, ss) {
    if (this.props.type !== prevProps.type) {
      this.initMenu();
    }
  }

  initMenu() {
    new MetisMenu("#side-menu");

    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    for (let i = 0; i < items.length; ++i) {
      if (this.props.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      this.activateParentDropdown(matchingMenuItem);
    }
  }

  // componentDidUpdate() {}

  scrollElement = item => {
    setTimeout(() => {
      if (this.refDiv.current !== null) {
        if (item) {
          const currentPosition = item.offsetTop;
          if (currentPosition > window.innerHeight) {
            if (this.refDiv.current)
              this.refDiv.current.getScrollElement().scrollTop =
                currentPosition - 300;
          }
        }
      }
    }, 300);
  };

  activateParentDropdown = item => {
    item.classList.add("active");
    const parent = item.parentElement;

    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      this.scrollElement(item);
      return false;
    }
    this.scrollElement(item);
    return false;
  };

  render() {
    return (
      <React.Fragment>
        <SimpleBar className="h-100" ref={this.refDiv}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu">
              <li className="menu-title">{this.props.t("alphaLabs")}</li>

              <li>
                <Link to="/terradash">
                  <i className="bx bx-home-circle me-2" />
                  <span>{this.props.t("Terra Core")}</span>
                </Link>
              </li>

              <li>
                <Link to="/farmers-market">
                  <i className="bx bx-home-circle me-2" />
                  <span>{this.props.t("Farmers Market")}</span>
                </Link>
              </li>

              <li>
                <Link to="/liq-profile">
                  <i className="bx bx-home-circle me-2" />
                  <span>{this.props.t("Liquidation Nodes")}</span>
                </Link>
              </li>

              <li>
                <Link to="">
                  <span>{this.props.t("")}</span>
                </Link>
              </li>

              <li>
                <Link to="">
                  <span>{this.props.t("")}</span>
                </Link>
              </li>

              <li className="menu-title">{this.props.t("Dashboards")}</li>
              <li>
                <Link to="/#">
                  <i className="bx bx-line-chart" />
                  <span>{this.props.t("TerraSwap")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/terra-pool-aprs">
                      {this.props.t("TerraSwap Trading APRs")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/terra-pool-tlvs">
                      {this.props.t("TerraSwap Pool TLVs")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/#">
                  <i className="bx bx-line-chart" />
                  <span>{this.props.t("AstroPort")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  <li>
                    <Link to="/astro-pool-aprs">
                      {this.props.t("AstroPort Trading APRs")}
                    </Link>
                  </li>

                  <li>
                    <Link to="/astro-pool-aprs-emissions">
                      {this.props.t("AstroPort APRs with Astro Emissions")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/spread-tracker">
                  <i className="bx bx-line-chart" />
                  <span>{this.props.t("Mirror")}</span>
                </Link>
                <ul className="sub-menu" aria-expanded="false">
                  {/*<li>
                    <Link to="/dashboard">{this.props.t("Commission APRs")}</Link>
                  </li>*/}
                  <li>
                    <Link to="/spread-tracker">
                      {this.props.t("Spread Tracker")}
                    </Link>
                  </li>
                  <li>
                    <Link to="/mirror-aprs">
                      {this.props.t("Mirror Protocol APRs")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <Link to="/anchor">
                  <i className="bx bx-line-chart" />
                  <span>{this.props.t("Anchor")}</span>
                </Link>
              </li>
              <li>
                <Link to="/nexus">
                  <i className="bx bx-line-chart" />
                  <span>{this.props.t("Nexus")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </SimpleBar>
      </React.Fragment>
    );
  }
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
  type: PropTypes.string,
};

export default withRouter(withTranslation()(SidebarContent));

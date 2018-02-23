import React from "react"
import PropTypes from "prop-types"
import { Route } from "react-router"
import HorizontalView from "@allthings/elements/behaviour/HorizontalView"
import { View } from "@allthings/elements"
import { matchPath, withRouter } from "react-router"

class HorizontalRouter extends React.Component {
  getMatchingRoutes(props) {
    return props.routes.reduce((acc, route) => {
      const match = matchPath(props.location.pathname, route)
      if (match) {
        const routeWithProps = Object.assign(route, {
          props: { match, location: props.location, history: props.history }
        })
        acc.push(routeWithProps)
      }
      return acc
    }, [])
  }

  render() {
    return (
      <HorizontalView>
        {this.getMatchingRoutes(this.props).map(route => (
          <route.component {...route.props} id={route.path} />
        ))}
      </HorizontalView>
    )
  }
}

export default withRouter(HorizontalRouter)

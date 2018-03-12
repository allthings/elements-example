import React from 'react'
import HorizontalView from '@allthings/elements/behaviour/HorizontalView'
import { matchPath, withRouter } from 'react-router'

class HorizontalRouter extends React.Component {
  getMatchingRoutes(props) {
    return props.routes.reduce((acc, route) => {
      const match = matchPath(props.location.pathname, route)
      if (match) {
        const routeWithProps = Object.assign(route, {
          props: { match, location: props.location, history: props.history },
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
          <route.component {...route.props} key="route.path" id={route.path} />
        ))}
      </HorizontalView>
    )
  }
}

export default withRouter(HorizontalRouter)

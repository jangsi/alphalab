import React from 'react';
import { Label, Button } from "reactstrap"
import PropTypes from 'prop-types';

/**
 * The header for a chart.
 * This component renders the title and an optional button if a callback option if passed in.
 * 
 * @example
 * return <ChartHeader title="My Line Chart" />
 * 
 * @example
 * return (
 *  <ChartHeader
 *    title="My Line Chart with Action"
 *    callbackOpts={{
 *      action: () => alert('called action'),
 *      icon: 'dropicons-warning',
 *    }}
 *  />
 * )
 */
const ChartHeader = (props) => {
  const { title, callbackOpts } = props
  let action, icon
  if (callbackOpts) {
    action = callbackOpts.action
    icon = callbackOpts.icon
    if (!action || typeof action !== 'function') {
      console.warn('Supplied callback opts without a valid action. A button will not be rendered.')
    }
    if (!icon || typeof icon !== 'string') {
      console.warn('Supplied callback opts without a valid icon. A button will not be rendered.')
    }
  }
  return (
    <div>
      <Label className="control-label">{title}</Label>
      {action ? (
        <div style={{ position: 'absolute', right: 20, top: 20 }}>
          <Button size="sm" outline onClick={action}><i className={icon} /></Button>
        </div>
      ) : null}
    </div>
  )
}

ChartHeader.propTypes = {
  title: PropTypes.string.isRequired,
  callbackOpts: PropTypes.shape({
    action: PropTypes.func,
    icon: PropTypes.string,
  }),
}

export default ChartHeader 

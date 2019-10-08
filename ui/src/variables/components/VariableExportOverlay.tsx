import React, {PureComponent} from 'react'
import {connect} from 'react-redux'

// Components
import ExportOverlay from 'src/shared/components/ExportOverlay'

// Actions
import {convertToTemplate as convertToTemplateAction} from 'src/variables/actions'
import {clearExportTemplate as clearExportTemplateAction} from 'src/templates/actions'

// Types
import {AppState} from 'src/types'
import {DocumentCreate} from '@influxdata/influx'
import {RemoteDataState} from 'src/types'

interface OwnProps {
  variableID: string
  onDismiss: () => void
}

interface DispatchProps {
  convertToTemplate: typeof convertToTemplateAction
  clearExportTemplate: typeof clearExportTemplateAction
}

interface StateProps {
  variableTemplate: DocumentCreate
  status: RemoteDataState
}

type Props = OwnProps & StateProps & DispatchProps

class VariableExportOverlay extends PureComponent<Props> {
  public async componentDidMount() {
    const {variableID, convertToTemplate} = this.props

    convertToTemplate(variableID)
  }

  public render() {
    const {variableTemplate, status} = this.props

    return (
      <ExportOverlay
        resourceName="Variable"
        resource={variableTemplate}
        onDismissOverlay={this.onDismiss}
        status={status}
      />
    )
  }

  private onDismiss = () => {
    const {clearExportTemplate, onDismiss} = this.props

    onDismiss()
    clearExportTemplate()
  }
}

const mstp = (state: AppState): StateProps => ({
  variableTemplate: state.templates.exportTemplate.item,
  status: state.templates.exportTemplate.status,
})

const mdtp: DispatchProps = {
  convertToTemplate: convertToTemplateAction,
  clearExportTemplate: clearExportTemplateAction,
}

export default connect<StateProps, DispatchProps, OwnProps>(
  mstp,
  mdtp
)(VariableExportOverlay)
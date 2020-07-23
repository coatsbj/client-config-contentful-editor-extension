import * as React from 'react';
import { render } from 'react-dom';
import {
  TextInput,
  Textarea,
  DisplayText,
  Paragraph,
  SectionHeading,
  FieldGroup,
  RadioButtonField,
  Typography,
    SelectField
} from '@contentful/forma-36-react-components';
import { SingleEntryReferenceEditor } from '@contentful/field-editor-reference';
import { init, FieldExtensionSDK } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import '@contentful/forma-36-fcss';
import './index.css';

interface AppProps {
  sdk: FieldExtensionSDK;
}

interface AppState {
  id: string;
  name: string;
  display_name?: string;
  parent?: AppState;
  type: string;
  show_activation_code: boolean;
  activation_code_field_label: string;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      id: props.sdk.entry.fields.id.getValue(),
      name: props.sdk.entry.fields.name.getValue(),
      display_name: props.sdk.entry.fields.display_name.getValue(),
      type: props.sdk.entry.fields.type.getValue(),
      show_activation_code: props.sdk.entry.fields.show_activation_code.getValue(),
      activation_code_field_label: props.sdk.entry.fields.activation_code_field_label.getValue(),
      parent: props.sdk.entry.fields.parent.getValue()
    };
  }

  onIdChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.id.setValue(event.target.value);
  };

  onNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.name.setValue(event.target.value);
  };

  onDisplayNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.display_name.setValue(event.target.value);
  };

  onParentChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.parent.setValue(event.target.value);
  };

  onShowActivationCodeChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const show_activation_code = event.target.value === 'yes';
    this.setState({ show_activation_code });
    this.props.sdk.entry.fields.show_activation_code.setValue(show_activation_code);
  };

  onActivationCodeFieldLabelChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.sdk.entry.fields.activation_code_field_label.setValue(event.target.value);
  };

  render() {
    return (
      <div className="f36-margin--l">
        <Typography>
          <DisplayText>Client Configuration Editor</DisplayText>
          <Paragraph>This editor allows for editing the overridable hierarchy of client config.</Paragraph>
          <SectionHeading>ID</SectionHeading>
          <TextInput onChange={this.onIdChangeHandler} value={this.state.id} />
          <SectionHeading>Type</SectionHeading>
          <SectionHeading>Parent</SectionHeading>
          <SingleEntryReferenceEditor isInitiallyDisabled={false} sdk={this.props.sdk} viewType={} parameters={{instance: {showCreateEntityAction: false}}} />
          <SectionHeading>Name</SectionHeading>
          <TextInput onChange={this.onNameChangeHandler} value={this.state.name} />
          <SectionHeading>DisplayName</SectionHeading>
          <TextInput onChange={this.onDisplayNameChangeHandler} value={this.state.name} />
          <SectionHeading>Show Activation Code?</SectionHeading>
          <FieldGroup row={false}>
            <RadioButtonField
              labelText="Yes"
              checked={this.state.show_activation_code}
              value="yes"
              onChange={this.onShowActivationCodeChangeHandler}
              name="abstractOption"
              id="yesCheckbox"
            />
            <RadioButtonField
              labelText="No"
              checked={!this.state.show_activation_code}
              value="no"
              onChange={this.onShowActivationCodeChangeHandler}
              name="abstractOption"
              id="noCheckbox"
            />
          </FieldGroup>
        </Typography>
        {this.state.show_activation_code && (
          <Typography>
            <SectionHeading>Activation Code Field Label</SectionHeading>
            <TextInput onChange={this.onActivationCodeFieldLabelChanged} value={this.state.activation_code_field_label} defaultValue={"Employee ID"} />
          </Typography>
        )}
      </div>
    );
  }
}

init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }

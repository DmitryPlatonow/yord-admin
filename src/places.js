import * as React from "react";
import {
    Datagrid,
    List,
    Create,
    Edit,
    Filter,
    ArrayInput,
    SimpleForm,
    ReferenceInput,
    TextField,
    TextInput,
    RichTextField,
    SelectInput,
    FileField,
    FileInput,
    DateField,
    SimpleFormIterator,
    RadioButtonGroupInput
} from "react-admin";
import RichTextInput from "ra-input-rich-text";

const PlaceFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Search" source="title" alwaysOn />
    </Filter>
);

export const PlaceList = (props) => (
    <List {...props} filters={<PlaceFilter />}>
        <Datagrid expand={<PlaceShow /> }>
            <TextField source="name" />
            <RichTextField source="type" />
            <DateField source="created" />
            <TextField source="schedule" />
            <TextField source="status" />
        </Datagrid>
    </List>
);

const RenderImage = ({ record }) =>
    <div>
        <img style={{ maxWidth: 200, maxHeight: 300 }} key={record.key} src={record.src} alt='image' />
    </div>


const ImagesList = ({ record }) => (
    <RadioButtonGroupInput
        source="previewImage"
        choices={record.images.map((item)=>({src: item, id: item}))}
        optionText={<RenderImage />}
    />
);

export const PlaceShow = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <SelectInput source="status" choices={[
                { id: 'Fetched', name: 'Fetched' },
                { id: 'Edited', name: 'Edited' },
                { id: 'Approved', name: 'Approved' },
            ]} />
            <TextInput source="id" options={{ disabled: true }} />
            <TextInput source="name" />
            <ArrayInput source="images">
                <SimpleFormIterator>
                    <TextInput label='' fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
            <ImagesList source="images" />
            <TextInput multiline source="description" />
            <TextInput source="location.address" label="address" />
            <TextInput source="location.geo.lat" label="lat" />
            <TextInput source="location.geo.lng" label="lng" />
            <ArrayInput source="socials">
                <SimpleFormIterator disableAdd disableRemove>
                    <TextInput label='' source="type" disabled />
                    <TextInput label='' source="value" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const PlaceCreate = (props) => (
    <Create {...props} >
        <SimpleForm>
            <TextInput source="title" />
            <RichTextInput source="body" />
            <ReferenceInput label="Comment" source="title" reference="comments">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <FileInput source="file" label="File">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Create>
);

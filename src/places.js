import * as React from "react";
import {
    Datagrid,
    List,
    Create,
    Edit,
    Filter,
    ArrayInput,
    SimpleForm,
    TextField,
    TextInput,
    RichTextField,
    SelectInput,
    DateField,
    SimpleFormIterator,
    RadioButtonGroupInput
} from "react-admin";
import ReactPlayer from "react-player";

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
        <img style={{ maxWidth: 200, maxHeight: 300 }} key={record.key} src={record.src} />
    </div>


const ImagesList = ({ record }) => !record.images?.some(item => !!item) ? null : (
    <RadioButtonGroupInput
        source="previewImage"
        choices={record.images.map((item)=>({src: item, id: item}))}
        optionText={<RenderImage />}
    />
);

const DisplayVideo = ({ record }) => !record.video ? null : (
    <ReactPlayer url={record.video} controls />
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
            <DisplayVideo  source="video" />
            <TextInput source="video" label="video" />
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

const choicesSocials = [
    { id: 'phone' },
    { id: 'url' },
    { id: 'website' },
    { id: 'instagram' },
];

export const PlaceCreate = (props) => (
    <Create {...props} >
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
            <DisplayVideo  source="video" />
            <TextInput source="video" label="video" />
            <TextInput multiline source="description" />
            <TextInput source="location.address" label="address" />
            <TextInput source="location.geo.lat" label="lat" />
            <TextInput source="location.geo.lng" label="lng" />
            <ArrayInput source="socials">
                <SimpleFormIterator disableRemove>
                    <SelectInput label='' source="type" choices={choicesSocials} optionText="id" optionValue="id" />
                    <TextInput label='' source="value" fullWidth />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);

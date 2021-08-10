// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
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
    EditButton,
    DeleteButton,
    RichTextField,
    SelectInput,
    FileField,
    FileInput,
    ImageField,
    DateField,
    SimpleFormIterator,
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
            <EditButton label="" />
            <DeleteButton label="" redirect={false}/>
        </Datagrid>
    </List>
);

const ImagesList = ({ record }) => (
    <div>
        {record.images.map(e=>({src: e, key: e})).map((item, index) => (
            <img key={item.key} src={item.src} title={index} alt='image' />
        ))}
    </div>
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
            <ImageField source="previewImage" title="title" />
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

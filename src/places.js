// in src/posts.js
import * as React from "react";
// tslint:disable-next-line:no-var-requires
import {
    Datagrid,
    List,
    Show,
    Create,
    Edit,
    Filter,
    SimpleShowLayout,
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
    DateInput,
    ImageField,
    DateField,
    UrlField,
    ArrayField,
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
)
ImagesList.defaultProps = {
    addLabel: true
};

export const PlaceShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ImageField source="previewImage" title="title" />
            <ImagesList source="images" />
            <ArrayField source="socials">
                <Datagrid>
                    <TextField source="type" />
                    <UrlField source="value" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
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

export const PlaceEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" options={{ disabled: true }} />
            <DateInput source="createdate" options={{ disabled: true }} />
            <DateInput source="lastupdate" options={{ disabled: true }} />
            <ReferenceInput label="Comment" source="title" reference="comments">
                <SelectInput optionText="title" />
            </ReferenceInput>
            <TextInput source="title" />
            <RichTextInput source="body" />
            <SelectInput source="rating" choices={[
                { id: 1, name: 'Good' },
                { id: 2, name: 'Okay' },
                { id: 3, name: 'Bad' },
            ]} />
            <FileInput source="file" label="File">
                <FileField source="src" title="title" />
            </FileInput>
        </SimpleForm>
    </Edit>
);

/**
 * @name index.js
 * @desc
 * @author: Created by XuYong of1615 on 2017/10/19
 */

import Button from './button';
import AddButton from "./addbutton";
import Counter from "./counter";
import DashLine from "./dashline";
import Loading from "./defaultpage/loading";
import LoadingError from "./defaultpage/loadingError";
import NoContent from "./defaultpage/noContent";
import Uploading from "./defaultpage/uploading";
import Confirm from "./dialog/confirm";
import IFlatList from "./iflatlist";
import IDatePicker from "./iform/iDatePicker";
import IInput from "./iform/iInput";
import InfoRow from "./iform/infoRow";
import ISinglePicker from "./iform/iSinglePicker";
import ImagePage from "./imagepage";
import ModalSelect from "./modalselect";
import SearchBar from "./searchbar";
import RowCell from "./sideslip";
import Picker from "./form/picker";
import DatePicker from "./form/date-picker";

const modules = {
    Button: Button,
    AddButton : AddButton,
    Counter : Counter,
    DashLine : DashLine,
    Loading : Loading,
    LoadingError : LoadingError,
    NoContent : NoContent,
    Uploading : Uploading,
    Confirm : Confirm,
    IFlatList : IFlatList,
    Picker : Picker,
    DatePicker : DatePicker,
    IDatePicker : IDatePicker,
    IInput : IInput,
    InfoRow : InfoRow,
    ISinglePicker : ISinglePicker,
    ImagePage : ImagePage,
    ModalSelect : ModalSelect,
    SearchBar : SearchBar,
    RowCell : RowCell,
};

module.exports = modules;
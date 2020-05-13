import Vue from 'vue'
import App from './App.vue'
import router from "@/router"

Vue.config.productionTip = false

import {
    Button,
    Input,
    Table,
    TableColumn,
    Dialog,
    Card,
    Container,
    Icon,
    Select,
    Form,
    Tag,
    Tree,
    Pagination,
    Badge,
    Loading,
    MessageBox,
    Menu,
    Tabs,
    TabPane,
    Breadcrumb,
    BreadcrumbItem,
    Dropdown,
    Steps,
    Tooltip,
    Popover,
    Collapse,
    FormItem,
    Checkbox,
    Header,
    DropdownMenu,
    DropdownItem,
    Avatar,
    Aside,
    Main,
    MenuItem,
    Submenu,
    Option,
    Col,
    Row,
    Upload,
    Radio,
    DatePicker,
    RadioGroup,
    CollapseItem,
    Switch
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000};
Vue.use(Switch);
Vue.use(CollapseItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(DatePicker);
Vue.use(Upload);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Checkbox);
Vue.use(FormItem);
Vue.use(Collapse);
Vue.use(Popover);
Vue.use(Menu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Dropdown);
Vue.use(Steps);
Vue.use(Tooltip);
Vue.use(Tree);
Vue.use(Pagination);
Vue.use(Badge);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Container);
Vue.use(Icon);
Vue.use(Select);
Vue.use(Form);
Vue.use(Tag);
Vue.use(Avatar)
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm


new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

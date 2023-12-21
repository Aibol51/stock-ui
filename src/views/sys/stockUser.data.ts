import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateStockUser } from '/@/api/sys/stockUser';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.stockUser.username'),
    dataIndex: 'username',
    width: 100,
  },
  {
    title: t('sys.stockUser.nickname'),
    dataIndex: 'nickname',
    width: 100,
  },
  {
    title: t('sys.stockUser.password'),
    dataIndex: 'password',
    width: 100,
  },
  {
    title: t('sys.stockUser.description'),
    dataIndex: 'description',
    width: 100,
  },
  {
    title: t('sys.stockUser.homePath'),
    dataIndex: 'homePath',
    width: 100,
  },
  {
    title: t('sys.stockUser.mobile'),
    dataIndex: 'mobile',
    width: 100,
  },
  {
    title: t('sys.stockUser.email'),
    dataIndex: 'email',
    width: 100,
  },
  {
    title: t('sys.stockUser.avatar'),
    dataIndex: 'avatar',
    width: 100,
  },
  {
    title: t('common.status'),
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: t('common.on'),
        unCheckedChildren: t('common.off'),
        loading: record.pendingStatus,
        onChange(checked, _) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 2;
          updateStockUser({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('common.createTime'),
    dataIndex: 'createdAt',
    width: 70,
    customRender: ({ record }) => {
      return formatToDateTime(record.createdAt);
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'username',
    label: t('sys.stockUser.username'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 20 }],
  },
  {
    field: 'nickname',
    label: t('sys.stockUser.nickname'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 10 }],
  },
  {
    field: 'mobile',
    label: t('sys.stockUser.mobile'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('sys.stockUser.email'),
    component: 'Input',
    colProps: { span: 8 },
    rules: [{ max: 100 }],
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: 'ID',
    component: 'Input',
    show: false,
  },

  {
    field: 'username',
    label: t('sys.stockUser.username'),
    component: 'Input',
    required: true,
    rules: [{ max: 50 }],
  },
  {
    field: 'nickname',
    label: t('sys.stockUser.nickname'),
    component: 'Input',
    required: true,
    rules: [{ max: 40 }],
  },
  {
    field: 'password',
    label: t('sys.stockUser.password'),
    component: 'Input',
    required: true,
    rules: [{ min: 6 }],
  },
  {
    field: 'description',
    label: t('sys.stockUser.description'),
    component: 'Input',
    required: true,
    rules: [{ max: 100 }],
  },
  {
    field: 'homePath',
    label: t('sys.stockUser.homePath'),
    component: 'Input',
    required: true,
    rules: [{ max: 70 }],
  },
  {
    field: 'mobile',
    label: t('sys.stockUser.mobile'),
    component: 'Input',
    required: true,
    rules: [{ max: 18 }],
  },
  {
    field: 'email',
    label: t('sys.stockUser.email'),
    component: 'Input',
    required: true,
    rules: [{ max: 80 }],
  },
  {
    field: 'avatar',
    label: t('sys.stockUser.avatar'),
    component: 'Input',
    required: true,
    rules: [{ max: 300 }],
  },
  {
    field: 'status',
    label: t('sys.stockUser.status'),
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: t('common.on'), value: 1 },
        { label: t('common.off'), value: 2 },
      ],
    },
  },
];

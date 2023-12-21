import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';
import { formatToDateTime } from '/@/utils/dateUtil';
import { updateStock } from '/@/api/sys/stock';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';
const { t } = useI18n();

export const columns: BasicColumn[] = [
  {
    title: t('sys.stock.stockName'),
    dataIndex: 'stockName',
    width: 100,
  },
  {
    title: t('sys.stock.stockCode'),
    dataIndex: 'stockCode',
    width: 100,
  },
  {
    title: t('sys.stock.stockRise'),
    dataIndex: 'stockRise',
    width: 50,
  },
  {
    title: t('sys.stock.stockFall'),
    dataIndex: 'stockFall',
    width: 50,
  },
  {
    title: t('sys.stock.isRecommend'),
    dataIndex: 'isRecommend',
    width: 100,
    customRender: ({ record }) => {
      // 如果记录中没有pendingRecommend字段，就添加它
      if (!Reflect.has(record, 'pendingRecommend')) {
        record.pendingRecommend = false;
      }
      return h(Switch, {
        checked: record.isRecommend, // 这里假设isRecommend字段就是一个布尔值
        checkedChildren: t('common.yes'),
        unCheckedChildren: t('common.no'),
        loading: record.pendingRecommend,
        onChange(checked, _) {
          record.pendingRecommend = true;
          const newStatus = checked ? true : false;
          // 更新股票信息，这里可能需要调整以匹配你的API
          updateStock({ id: record.id, isRecommend: newStatus })
            .then(() => {
              record.isRecommend = checked;
            })
            .finally(() => {
              record.pendingRecommend = false;
            });
        },
      });
    },
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
          updateStock({ id: record.id, status: newStatus })
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
    field: 'stockName',
    label: t('sys.stock.stockName'),
    component: 'Input',
    colProps: { span: 8 },
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
    field: 'stockName',
    label: t('sys.stock.stockName'),
    component: 'Input',
    required: true,
  },
  {
    field: 'stockCode',
    label: t('sys.stock.stockCode'),
    component: 'Input',
    required: true,
  },
  {
    field: 'stockRise',
    label: t('sys.stock.stockRise'),
    component: 'Input',
    required: false,
  },
  {
    field: 'stockFall',
    label: t('sys.stock.stockFall'),
    component: 'Input',
    required: false,
  },
  {
    field: 'addTime',
    label: t('sys.stock.addTime'),
    component: 'Input',
    required: false,
  },
  {
    field: 'stockTags',
    label: t('sys.stock.stockTags'),
    component: 'Input',
    required: false,
  },
  {
    field: 'details',
    label: t('sys.stock.details'),
    component: 'InputTextArea',
    required: false,
    componentProps: {
      rows: 10, // 设置 textarea 的默认行数为 10
    },
  },
  {
    field: 'isRecommend',
    label: t('sys.stock.isRecommend'),
    component: 'RadioButtonGroup',
    defaultValue: false,
    componentProps: {
      options: [
        { label: t('common.yes'), value: true },
        { label: t('common.no'), value: false },
      ],
    },
    required: true,
  },
  {
    field: 'status',
    label: t('sys.stock.status'),
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
export const formSchemaBatches: FormSchema[] = [
  {
    label: t('sys.stock.addInBatches'),
    field: 'addInBatches',
    component: 'InputTextArea',
    required: true,
    rules: [
      { 
        validator: (_, value) => {
          if (!value || value.split('\n').length < 2) {
            return Promise.reject(new Error('输入必须多于1行'));
          }
          return Promise.resolve();
        },
        trigger: 'change',
      },
    ],
    componentProps: {
      rows: 10, // 设置 textarea 的默认行数为 10
      // 你可以在这里添加更多的属性，例如 placeholder 等
      placeholder: '输入格式:股票名称 股票代码 涨跌 涨跌幅度 添加时间 (标签) 详情',

    },
    // 可以添加其他组件属性，如 rows, placeholder 等
  },
];



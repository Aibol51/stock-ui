<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="500px"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema, formSchemaBatches } from './stock.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from 'vue-i18n';

  import { createStock, updateStock } from '/@/api/sys/stock';

  export default defineComponent({
    name: 'StockDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const isBatchCreate = ref(false);
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelWidth: 90,
        baseColProps: { span: 24 },
        // schemas: formSchema,
        schemas: computed(() => (isBatchCreate.value ? formSchemaBatches : formSchema)),
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        // 更新 isUpdate 和 isBatchCreate 的值
        isUpdate.value = !!data?.isUpdate;
        isBatchCreate.value = !!data?.isBatchCreate;

        if (unref(isUpdate)) {
          setFieldsValue({
            ...data.record,
          });
        }
      });

      const getTitle = computed(() =>
        isBatchCreate.value
          ? t('sys.stock.addInBatches')
          : !unref(isUpdate)
          ? t('sys.stock.addStock')
          : t('sys.stock.editStock'),
      );

      async function handleSubmit() {
        const values = await validate();
        setDrawerProps({ confirmLoading: true });

        // 检查是否为批量创建
        if (isBatchCreate.value) {
          // 批量创建的逻辑
          const lines = values.addInBatches.split('\n');
          const stocksData = lines.map((line) => {
            // 分割每行数据
            const parts = line.split(' ');
            // 提取前五个元素为基本信息
            const [stockName, stockCode, stockRise, stockFall, addTime] = parts;

            // 初始化详情和标签
            let details = '';
            let stockTags = '';

            // 检查是否存在括号，并提取标签和详情
            if (parts.length > 5) {
              const rest = parts.slice(5).join(' ');
              const tagMatch = rest.match(/\((.*?)\)/);
              if (tagMatch) {
                stockTags = tagMatch[1]; // 提取标签字符串
                details = rest.replace(/\(.*?\)/, '').trim(); // 提取详情
              } else {
                details = rest;
              }
            }

            return {
              id: undefined,
              stockName,
              stockCode,
              stockRise,
              stockFall,
              isRecommend: false,
              status: 1,
              addTime,
              stockTags,
              details,
            };
          });

          let completed = 0;
          for (const stock of stocksData) {
            try {
              let result = await createStock(stock);
              if (result.code === 0) {
                completed++;
              } else {
                console.error('股票数据创建失败', result);
              }
            } catch (error) {
              console.error('请求失败', error);
            }
          }

          if (completed === stocksData.length) {
            console.log(`成功创建 ${completed} 个股票`);
          } else {
            console.error(`只有 ${completed} / ${stocksData.length} 个股票创建成功`);
          }
        } else {
          // 原有的创建或更新逻辑
          values['id'] = unref(isUpdate) ? values['id'] : '';
          let result = unref(isUpdate) ? await updateStock(values) : await createStock(values);
          if (result.code === 0) {
            console.log('股票数据创建/更新成功');
          } else {
            console.error('股票数据创建/更新失败', result);
          }
        }

        closeDrawer();
        emit('success');
        setDrawerProps({ confirmLoading: false });
      }

      // async function handleSubmit() {
      //   const values = await validate();
      //   console.log('Textarea data:', values.addInBatches);
      //   setDrawerProps({ confirmLoading: true });
      //   values['id'] = unref(isUpdate) ? values['id'] : '';
      //   let result = unref(isUpdate) ? await updateStock(values) : await createStock(values);
      //   if (result.code === 0) {
      //     closeDrawer();
      //     emit('success');
      //   }
      //   setDrawerProps({ confirmLoading: false });
      // }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
      };
    },
  });
</script>

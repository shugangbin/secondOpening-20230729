<template>
    <div class="record-container">
        <div
            class="record-container__header cursor-pointer flex items-center justify-start"
            @click="handleDelete"
            :color="isDelete ? 'var(--el-color-primary)' : '#5b5b5b'"
        >
            <el-icon
                size="14"
            >
                <Setting />
            </el-icon>
            <div class="text-md mt-[2px] ml-[4px]">管理</div>
        </div>
        <!--    绘画记录    -->
        <div class="record-container__main">
            <ElScrollbar v-if="recordList.length">
                <div class="drawing-record">
                    <div
                        v-for="(item, index) in recordList"
                        :key="item"
                        class="drawing-record__item cursor-pointer mb-[10px]"
                        :class="{
                            'drawing-record__item_active': index == recordIndex
                        }"
                        @click="choiceRecord(item, index)"
                    >
                        <!--  加载中（用于绘画中没有值的时候显示的  -->
                        <div
                            v-if="!item.image_url && item.status != 2"
                            class="w-full h-full flex justify-center items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="80px"
                                height="80px"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="xMidYMid"
                                class="lds-eclipse"
                            >
                                <path
                                    stroke="none"
                                    d="M10 50A40 40 0 0 0 90 50A40 44 0 0 1 10 50"
                                    fill="#fe718d"
                                    transform="rotate(54 50 52)"
                                >
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        calcMode="linear"
                                        values="0 50 52;360 50 52"
                                        keyTimes="0;1"
                                        dur="1s"
                                        begin="0s"
                                        repeatCount="indefinite"
                                    />
                                </path>
                            </svg>
                        </div>
                        <image-contain
                            v-else
                            :radius="5"
                            height="100%"
                            :src="item.image_url"
                            :lazy="false"
                            fit="cover"
                        >
                        </image-contain>
                        <img
                            v-show="item.show && isDelete"
                            class="icon_delete"
                            :src="IconSelect"
                            alt="选中"
                        />
                        <img
                            v-show="!item.show && isDelete"
                            class="icon_delete"
                            :src="IconUnSelect"
                            alt="未选中"
                        />
                    </div>
                </div>
            </ElScrollbar>
            <!--    空状态    -->
            <div
                v-else
                :style="{
                    height: `calc(100vh - ${isDelete ? 190 : 115}px)`
                }"
                class="h-full flex justify-center items-center text-[#999999]"
            >
                暂无绘画记录
            </div>
        </div>

        <!--    底部操作    -->
        <div
            v-if="isDelete && !isReceiving"
            class="drawing-record__footer p-[15px]"
        >
            <el-button
                type="danger"
                size="large"
                class="w-full"
                style="background-color: #ff4343"
                @click="onDelete"
            >
                删除记录
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Setting } from '@element-plus/icons-vue'
import IconSelect from 'assets/images/drawing/icon_select.png'
import IconUnSelect from 'assets/images/drawing/icon_unselect.png'
import { useVModels } from '@vueuse/core'

const emit = defineEmits<{
    (event: 'change', value: any): void
    (event: 'delete', value: number[]): void
    (event: 'update:current', value: number): void
}>()

const props = withDefaults(
    defineProps<{
        current: number
        contentList: any // 记录
        isReceiving: boolean // 是否正在生成中
    }>(),
    {
        current: 0,
        contentList: [],
        isReceiving: false
    }
)
const { current: recordIndex, contentList: recordList } = useVModels(
    props,
    emit
)

const isDelete = ref<boolean>(false)

const handleDelete = () => {
    if (props.isReceiving) return
    isDelete.value = !isDelete.value
}

const choiceRecord = (row: any, index: number) => {
    if (props.isReceiving) return
    if (isDelete.value && !recordList.value[index].show) {
        recordList.value[index].show = true
    } else if (isDelete.value && recordList.value[index].show) {
        recordList.value[index].show = false
    } else {
        emit('change', row)
        emit('update:current', index)
    }
}

const onDelete = () => {
    const filterArr = recordList.value.filter((item: any) => item.show)
    const resultIds = filterArr.map((item) => item.id)
    emit('delete', resultIds)
}
</script>

<style lang="scss" scoped>
.record-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    &__header {
        //border-bottom: 1px solid #f2f2f2;
    }
    &__main {
        flex: 1;
        min-height: 0;
        .drawing-record {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            padding: 15px 0;
            &__item {
                position: relative;
                width: 155px;
                height: 155px;
                padding: 5px;
                border-radius: 5px;
                border: 1px solid #e5e5e5;

                .icon_delete {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    width: 20px;
                    height: 20px;
                }
            }
            &__item_active {
                border: 1px solid var(--el-color-primary);
            }
        }
    }
    &__footer {
    }
}
</style>

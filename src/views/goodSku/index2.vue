<template>
    <div class="release_sale release" id="release_sale">
        <div class="title">
            <span>销售信息</span>
        </div>
        <div class="release_sale_form p20">
            <el-form
                size="mini"
                ref="saleForm"
                :model="saleForm"
                label-width="100px"
                :rules="rules"
            >
                <!-- <el-form-item>
          <el-button type="primary" @click="submitForm1('saleForm')">提交</el-button>
        </el-form-item>-->

                <el-form-item
                    v-if="!saleForm.specification.length"
                    label="商品规格 :"
                >
                    <div class="release_sale_form_add_specification_btn">
                        <el-button @click="handleAddSpecification"
                            >+ 添加规格项</el-button
                        >
                    </div>
                </el-form-item>

                <div style="margin-bottom: 20px" v-else>
                    <div
                        class="release_sale_form_add_specification"
                        v-for="(domain, index) in saleForm.specification"
                        :key="index"
                    >
                        <el-form-item
                            class="parent_form_item"
                            :label="index === 0 ? '商品规格 :' : ''"
                            :prop="'specification.' + index + '.name'"
                            :rules="{
                                required: true,
                                message: '请填写规格项名称',
                                trigger: 'change',
                            }"
                        >
                            <div
                                @mouseover="currentParentErrIndex = index"
                                @mouseout="currentParentErrIndex = -1"
                                class="release_sale_form_add_specification_list"
                            >
                                <div
                                    class="release_sale_form_add_specification_list_title"
                                >
                                    <div>
                                        <span>规格项：</span>
                                        <el-autocomplete
                                            class="inline-input"
                                            v-model="domain.name"
                                            @blur="
                                                (e) =>
                                                    handleAutocompleteBlur(
                                                        e,
                                                        index
                                                    )
                                            "
                                            @focus="
                                                (e) =>
                                                    handleAutocompleteFocus(
                                                        e,
                                                        index
                                                    )
                                            "
                                            :fetch-suggestions="itemSearch"
                                            placeholder="请输入内容,最多允许4个字"
                                            :maxlength="4"
                                            @select="handleSelectitem(index)"
                                        ></el-autocomplete>
                                        <el-checkbox
                                            v-if="index === 0"
                                            v-model="checkedImage"
                                        >
                                            <span
                                                style="
                                                    color: #7a797a;
                                                    font-size: 12px;
                                                "
                                                >添加图片规格</span
                                            >
                                        </el-checkbox>
                                    </div>
                                    <i
                                        v-show="
                                            currentParentErrIndex === index &&
                                            saleForm.specification.length > 1
                                        "
                                        @click="
                                            saleForm.specification.splice(
                                                index,
                                                1
                                            )
                                        "
                                        class="el-icon-error"
                                    ></i>
                                </div>
                                <div class="p20">
                                    <ul
                                        class="release_sale_form_add_specification_list_ul"
                                    >
                                        <li
                                            style="margin-bottom: 5px"
                                            v-if="index === 0"
                                        >
                                            规格值用于区分商品的不同属性，以方便用户购买选择，同一商品下请保持规格类型一致，图片大小不能超过3M；为保证清晰度，图片尺寸需大于750*750，图片大小比例1：1。
                                        </li>
                                        <li
                                            class="release_sale_form_add_specification_list_ul_warp"
                                        >
                                            <div
                                                style="
                                                    margin-right: 10px;
                                                    min-width: 50px;
                                                "
                                            >
                                                规格值 :
                                            </div>
                                            <div
                                                style="
                                                    display: flex;
                                                    flex-wrap: wrap;
                                                "
                                            >
                                                <div
                                                    v-for="(
                                                        val, valIndex
                                                    ) in domain.value"
                                                    :key="valIndex"
                                                    v-show="domain.value.length"
                                                    @mouseover="
                                                        val.currentChildErrIndex = valIndex
                                                    "
                                                    @mouseout="
                                                        val.currentChildErrIndex = -1
                                                    "
                                                    class="release_sale_form_add_specification_list_ul_val"
                                                >
                                                    <el-form-item
                                                        style="
                                                            margin-bottom: 15px;
                                                        "
                                                        class="child_form_item"
                                                        label-width="auto"
                                                        :prop="
                                                            'specification.' +
                                                            index +
                                                            '.value.' +
                                                            valIndex +
                                                            '.name'
                                                        "
                                                        :rules="{
                                                            required: true,
                                                            message:
                                                                '请填写规格值',
                                                            trigger: 'change',
                                                        }"
                                                    >
                                                        <el-autocomplete
                                                            class="inline-input long_input"
                                                            v-model="val.name"
                                                            @blur="
                                                                (e) =>
                                                                    handleAutocompleteChildBlur(
                                                                        e,
                                                                        index,
                                                                        valIndex
                                                                    )
                                                            "
                                                            @focus="
                                                                (e) =>
                                                                    handleAutocompleteChildFocus(
                                                                        e,
                                                                        index,
                                                                        valIndex
                                                                    )
                                                            "
                                                            :fetch-suggestions="
                                                                (
                                                                    queryString,
                                                                    cb
                                                                ) => {
                                                                    return valueSearch(
                                                                        queryString,
                                                                        cb,
                                                                        domain.name
                                                                    );
                                                                }
                                                            "
                                                            placeholder="请输入内容,最多允许20个字"
                                                            style="
                                                                width: 150px;
                                                                margin-bottom: 10px;
                                                            "
                                                            @select="
                                                                handleSelectvalue
                                                            "
                                                            :maxlength="20"
                                                        ></el-autocomplete>
                                                        <i
                                                            @click="
                                                                saleForm.specification[
                                                                    index
                                                                ].value.splice(
                                                                    valIndex,
                                                                    1
                                                                )
                                                            "
                                                            v-show="
                                                                val.currentChildErrIndex ===
                                                                valIndex
                                                            "
                                                            class="el-icon-error"
                                                        ></i>
                                                    </el-form-item>
                                                    <el-form-item
                                                        style="
                                                            margin-bottom: 20px;
                                                        "
                                                        v-if="
                                                            index === 0 &&
                                                            checkedImage
                                                        "
                                                        class="child_form_item"
                                                        label-width="auto"
                                                        :prop="
                                                            'specification.' +
                                                            index +
                                                            '.value.' +
                                                            valIndex +
                                                            '.img'
                                                        "
                                                        :rules="{
                                                            required: true,
                                                            message:
                                                                '请上传规格值图片',
                                                            trigger: 'change',
                                                        }"
                                                    >
                                                        <el-upload
                                                            class="avatar-uploader"
                                                            action="https://upload.qiniup.com/"
                                                            :data="{
                                                                token:
                                                                    $store
                                                                        .getters
                                                                        .qiniu_token,
                                                            }"
                                                            :show-file-list="
                                                                false
                                                            "
                                                            accept=".png, .jpg, .jpeg, .gif"
                                                            :on-success="
                                                                (res, file) =>
                                                                    handleAvatarSuccess(
                                                                        res,
                                                                        file,
                                                                        index,
                                                                        valIndex
                                                                    )
                                                            "
                                                            :before-upload="
                                                                beforeAvatarUpload
                                                            "
                                                        >
                                                            <img
                                                                v-if="val.img"
                                                                :src="val.img"
                                                                class="avatar"
                                                            />
                                                            <i
                                                                v-else
                                                                class="el-icon-plus avatar-uploader-icon"
                                                            ></i>
                                                        </el-upload>
                                                    </el-form-item>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <div
                                        v-show="
                                            domain.value.length || domain.name
                                        "
                                    >
                                        <span
                                            style="
                                                color: #eb7044;
                                                margin-right: 5px;
                                                cursor: pointer;
                                            "
                                            :style="{
                                                color:
                                                    domain.value.length > 7
                                                        ? '#F8BEA3'
                                                        : '#eb7044',
                                            }"
                                            @click="
                                                handleAddSpecificationVal(
                                                    domain.value.length,
                                                    index
                                                )
                                            "
                                            >+ 添加规格值</span
                                        >
                                        <span
                                            >最多可添加8个规格值，还可添加{{
                                                8 - domain.value.length
                                            }}个</span
                                        >
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </div>
                    <div
                        style="margin-left: 100px"
                        class="release_sale_form_add_specification_btn"
                    >
                        <el-button
                            :disabled="saleForm.specification.length > 2"
                            :class="
                                saleForm.specification.length > 2
                                    ? 'disAbledBtn'
                                    : ''
                            "
                            @click="handleAddSpecification"
                            >+ 添加规格项</el-button
                        >
                        <span
                            @click="handleDraggable"
                            style="
                                text-decoration: underline;
                                color: #eb7044;
                                font-size: 13px;
                                margin-left: 10px;
                                cursor: pointer;
                            "
                            >规格排序</span
                        >
                    </div>
                </div>
                <el-form-item
                    prop="tableDate"
                    v-if="isSortContentShow"
                    label="规格明细 :"
                >
                    <!-- <div style="color: #7A797A">此处库存仍然为商品的可售卖库存，可以直接进行修改，修改后，买家看到的商品可售库存数量会进行变化</div> -->
                    <specDetail
                        :isEditSpecArr="isEditSpecArr"
                        :isEditSpecArr2="isEditSpecArr2"
                        :specification="saleForm.tableDate"
                        v-on:childByValue="childByValue"
                    />
                </el-form-item>
                <el-form-item label="商品价格 :" prop="goodPrice">
                    <el-input-number
                        style="width: 270px"
                        :disabled="saleForm.specification.length > 0"
                        size="mini"
                        :min="0.01"
                        v-model="saleForm.goodPrice"
                    ></el-input-number
                    >元
                </el-form-item>
                <el-form-item label="划线价格 :" prop="goodLine">
                    <el-input-number
                        @change="goodLinePrice"
                        style="width: 270px"
                        size="mini"
                        v-model="saleForm.goodLine"
                    ></el-input-number
                    >元
                    <span style="margin-left: 5px; color: #eb7044">
                        <i class="el-icon-warning"></i>划线价格需大于商品价格
                    </span>
                </el-form-item>
                <el-form-item label="商品折扣 :" prop="discount">
                    <el-input-number
                        style="width: 270px"
                        size="mini"
                        :min="10"
                        :max="100"
                        :precision="0"
                        v-model="saleForm.discount"
                    ></el-input-number
                    >%
                    <span style="margin-left: 5px; color: #eb7044">
                        <i class="el-icon-warning"
                            >折扣比例以百分数录入，百分比即为折扣数（如85%为八五折，60%为六折）</i
                        >
                    </span>
                </el-form-item>
                <div class="block">
                    <span style="font-size: 12px; padding-left: 37px"
                        >折扣期限：</span
                    >
                    <el-date-picker
                        size="mini"
                        :picker-options="pickerOptions0"
                        @change="(time) => changeTime(time, 1)"
                        v-model="saleForm.discount_start_time"
                        type="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="开始时间"
                    >
                    </el-date-picker>
                    &nbsp;-&nbsp;
                    <el-date-picker
                        size="mini"
                        :picker-options="pickerOptions0"
                        @change="(time) => changeTime(time, 2)"
                        v-model="saleForm.discount_end_time"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="结束时间"
                    >
                    </el-date-picker>
                </div>
            </el-form>
        </div>

        <el-dialog
            append-to-body
            title="规格排序"
            :visible.sync="dialogTableVisible"
        >
            <div>
                <ul>
                    <li v-show="isSortContentShow" style="margin-bottom: 10px">
                        拖动规格值进行排序
                    </li>
                    <li
                        v-show="isSortContentShow"
                        style="margin-bottom: 20px"
                        v-for="(spec, index) in saleForm.sortTableData"
                        :key="index"
                    >
                        <div
                            v-show="spec.name && spec.isShow"
                            style="margin-bottom: 15px"
                        >
                            {{ spec.name + ":" }}
                        </div>
                        <div class="elDialogSpec">
                            <draggable
                                :list="spec.value"
                                :options="{
                                    forceFallback: true,
                                    animation: '500',
                                    chosenClass: 'chosenClass',
                                }"
                            >
                                <span
                                    v-show="val.name"
                                    v-for="(val, valIndex) in spec.value"
                                    :key="valIndex"
                                    >{{ val.name }}</span
                                >
                            </draggable>
                        </div>
                    </li>
                    <li
                        v-show="!isSortContentShow"
                        style="
                            text-align: center;
                            height: 100px;
                            line-height: 100px;
                        "
                    >
                        无可拖拽的商品规格~~
                    </li>
                    <li style="text-align: center">
                        <el-button
                            v-show="isSortContentShow"
                            style="padding: 10px 20px"
                            type="primary"
                            @click="handleSaveSort"
                            >保 存</el-button
                        >
                        <el-button
                            style="padding: 10px 20px"
                            @click="dialogTableVisible = false"
                            >取 消</el-button
                        >
                    </li>
                </ul>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import draggable from "vuedraggable";
import  specDetail from './specDetail2'
export default {
    props: {
        detail: {},
    },
    components: {
        draggable,
        // specDetail: () => import("./sala/specDetail"),
        specDetail
    },
    name: "release_sale",
    data() {
        var checkAge = (rule, value, callback) => {
            let flag = true;
            console.log(value);
            value.forEach((item) => {
                flag = item.value.every((item) => item.goods_price);
            });
            if (!flag) {
                return callback(new Error("请填写价格"));
            } else {
                callback();
            }
        };
        return {
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
                },
            },
            dialogTableVisible: false,
            currentParentErrIndex: -1,
            rules: {
                goodPrice: [
                    {
                        required: true,
                        message: "请输入商品价格",
                        trigger: "blur",
                    },
                ],
                tableDate: [{ validator: checkAge, trigger: "blur" }],
            },
            saleForm: {
                specification: [
                    {
                        name: "",
                        currentChildErrIndex: -1,
                        isShow: false,
                        value: [],
                    },
                ],
                tableDate: [],
                sortTableData: [],
                goodPrice: 0.01,
                goodLine: "",
                discount: 100,
                discount_start_time: null,
                discount_end_time: null,
            },
            checkedImage: false, //是否添加图片规格
            itemArr: [],
            selectVal: "",
            isSortContentShow: false,
            draggableArr: [],
            test: 0,
            childValue: [],
            isEditSpecArr: [],
            isEditSpecArr2: [],
        };
    },
    watch: {
        "saleForm.specification": {
            handler: function (val) {
                this.isSpecificationVal();
            },
            deep: true,
        },
        detail(newValue, oldValue) {
            if (newValue.id) {
                this.saleForm.specification = JSON.parse(
                    newValue.attribute_list
                );
                this.saleForm.specification[0].value.forEach((el) => {
                    if (el.img) {
                        this.checkedImage = true;
                        return false;
                    }
                });
                this.saleForm.goodPrice = newValue.price;
                this.saleForm.goodLine = newValue.original_price;
                this.saleForm.discount = newValue.discount;
                this.saleForm.discount_start_time = newValue.discount_start_time
                    ? newValue.discount_start_time
                    : "";
                this.saleForm.discount_end_time = newValue.discount_end_time
                    ? newValue.discount_end_time
                    : "";

                if (newValue.attribute.length) {
                    newValue.attribute.forEach((item) => {
                        item.goods_spec = JSON.parse(item.goods_spec);
                    });
                    // console.log(newValue.attribute);
                    this.isEditSpecArr = newValue.attribute;
                    this.isEditSpecArr2 = newValue.attribute;
                }
                // console.log(this.saleForm);
            } else {
                // console.log("新建");
            }
        },
    },
    mounted() {
        // this.getGoodspec();
        this.isSpecificationVal();
        // this.$on("global:mixPrice", (price) => {
        //     this.saleForm.goodPrice = price;
        // });
        // this.$on("global:isComplete", (i) => {
        //     this.isEditSpecArr = [];
        // });
    },
    methods: {
        changeTime(time, a) {
            if (a == 1 && time) {
                // let str = this.dateTime(time);
                this.saleForm.discount_start_time = time;
            } else if (a == 1 && !time) {
                this.saleForm.discount_start_time = "";
            } else if (a == 2 && time) {
                // let str = this.dateTime(time);
                this.saleForm.discount_end_time = time;
            } else if (a == 2 && !time) {
                this.saleForm.discount_end_time = "";
            }
        },
        async getGoodspec() {
            let res = await this.goods.getGoodspec();
            res.data.data.forEach((el) => {
                let obj = {
                    value: "",
                    address: [],
                };
                obj.value = el.attribute_name;
                el.attribute.forEach((ell) => {
                    obj.address.push({ value: ell.attribute_value });
                });
                this.itemArr.push(obj);
            });
        },
        childByValue: function (childValue) {
            this.childValue = childValue;
        },
        isSpecificationVal() {
            if (!this.saleForm.specification.length) return;
            this.isSortContentShow = this.saleForm.specification.some((item) =>
                item.value.some((i) => i.name)
            );
            if (!this.saleForm.specification.length) this.selectVal = "";
            this.saleForm.specification.forEach((item) => {
                // this.isSortContentShow = item.value.some(item=>item.name)
                if (item.value.length) {
                    item.value.forEach((i) => {
                        if (i) {
                            item.isShow = true;
                        } else {
                            item.isShow = false;
                        }
                    });
                } else {
                    item.isShow = false;
                }
            });
            let arr = Object.assign([], this.saleForm.specification);
            this.saleForm.tableDate = JSON.parse(JSON.stringify(arr));
            this.saleForm.sortTableData = JSON.parse(JSON.stringify(arr));
            // console.log(this.saleForm)
        },
        //提交
        // submitForm1(formName) {
        //     console.log(this.saleForm.specification);
        //     this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             if(this.saleForm.goodPrice > this.saleForm.goodLine){
        //               return  this.$message.error('划线价格需大于商品价格')
        //             }
        //             alert('submit!');
        //         } else {
        //             console.log('error submit!!');
        //             return false;
        //         }
        //     });
        // },
        //保存排序值
        handleSaveSort() {
            this.dialogTableVisible = false;
            this.saleForm.specification = this.saleForm.sortTableData;
        },
        //拖拽排序弹框
        handleDraggable() {
            this.dialogTableVisible = true;
            let arr = Object.assign([], this.saleForm.specification);
            // this.saleForm.tableDate = JSON.parse(JSON.stringify(arr))
            this.saleForm.sortTableData = JSON.parse(JSON.stringify(arr));
        },
        //添加规格项
        handleAddSpecification() {
            if (this.saleForm.specification.length > 2) {
                return this.$message.warning("最多添加3个规格项");
            }
            this.saleForm.specification.push({
                name: "",
                currentChildErrIndex: -1,
                isShow: false,
                value: [],
            });
        },
        //添加规格值
        handleAddSpecificationVal(num, index) {
            if (8 - num === 0) {
                return this.$message.warning("最多可添加8个规格值");
            }
            this.saleForm.specification[index].value.push({
                goods_spec_value_key:
                    String(index + 1) + "-" + new Date().getTime(),
                name: "",
                img: "",
                goods_price: 0.01,
                bar_code: "",
            });
            console.log(this.saleForm.specification);
        },
        submitForm() {
            this.$refs["saleForm"].validate((valid) => {
                if (valid) {
                    if (this.saleForm.goodPrice > this.saleForm.goodLine) {
                        console.log("sale error   submit!!");
                        this.$message.error("划线价格需大于商品价格");
                        return false;
                    } else {
                        this.test = 1;
                        console.log("sale submit!!");
                        console.log(this.saleForm, this.childValue);
                        this.$emit(
                            "childBysale",
                            this.test,
                            this.saleForm,
                            this.childValue
                        );
                    }
                } else {
                    this.test = 0;
                    console.log("sale error   submit!!");
                    // this.$emit("childBysale", this.test);
                }
            });
        },
        handleSelectitem(index) {
            console.log(index);
        },
        handleSelectvalue(item) {
            // console.log(item);
        },
        //选择规格项blur事件
        handleAutocompleteBlur(e, index) {
            if (this.saleForm.specification[index].name) {
                this.selectVal = this.saleForm.specification[index].name;
                if (!this.saleForm.specification[index].value.length) {
                    this.saleForm.specification[index].value.push({
                        goods_spec_value_key:
                            String(index + 1) + "-" + new Date().getTime(),
                        name: "",
                        img: "",
                        goods_price: 0.01,
                        bar_code: "",
                    });
                }
            } else {
                this.saleForm.specification[index].name = this.selectVal;
            }
        },
        handleAutocompleteFocus(e, index) {
            this.selectVal = this.saleForm.specification[index].name;
        },
        //选择规格值blur事件
        handleAutocompleteChildBlur(e, index, valIndex) {
            // console.log(this.selectVal)
            // console.log(this.saleForm.specification[index].value[valIndex].name)
            console.log(this.saleForm.specification);
            console.log(this.saleForm.specification[index].value);

            if (this.saleForm.specification[index].value[valIndex].name) {
                this.selectVal = this.saleForm.specification[index].value[
                    valIndex
                ].name;
            } else {
                this.saleForm.specification[index].value[
                    valIndex
                ].name = this.selectVal;
            }
        },
        //划线价格不能小于商品价格
        goodLinePrice() {
            if (this.saleForm.goodPrice > this.saleForm.goodLine) {
                this.$message.error("划线价格需大于商品价格");
            }
        },
        handleAutocompleteChildFocus(e, index, valIndex) {
            this.selectVal = this.saleForm.specification[index].value[
                valIndex
            ].name;
        },
        itemSearch(queryString, cb) {
            var results = queryString
                ? this.itemArr.filter(this.itemFilter(queryString))
                : this.itemArr;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        itemFilter(queryString) {
            return (restaurant) => {
                return (
                    restaurant.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        valueSearch(queryString, cb, name) {
            let index = -1;
            this.itemArr.forEach((item, i) => {
                if (item.value == name) {
                    index = i;
                }
            });
            // var results = queryString
            //   ? this.itemArr[index].address.filter(this.valueFilter(queryString))
            //   : this.itemArr[index].address;
            var results = [];
            if (index == -1) {
                results = [];
                // console.log("没有对应值");
            } else {
                // console.log("返回对应值");
                results = this.itemArr[index].address.filter(
                    this.valueFilter(queryString)
                );
            }
            cb(results);
        },
        valueFilter(queryString) {
            return (restaurant) => {
                return (
                    restaurant.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        //图片上传成功
        handleAvatarSuccess(res, file, index, valIndex) {
            console.log(res);
            this.saleForm.specification[index].value[valIndex].img =
                "https://img.zhugexuetang.com/" + res.key;
        },
        //上传限制
        beforeAvatarUpload(file) {
            const isLt3M = file.size / 1024 / 1024 < 3;
            if (!isLt3M) {
                this.$message.error("上传规格值图片大小不能超过 3MB!");
            }
            let _this = this;
            const isSize = new Promise(function (resolve, reject) {
                let width = 750;
                let height = 750;
                let _URL = window.URL || window.webkitURL;
                let img = new Image();
                img.onload = function () {
                    file.width = img.width;
                    file.height = img.height;
                    let valid =
                        img.width >= width &&
                        img.height >= height &&
                        img.width / img.height === 1;
                    valid ? resolve() : reject();
                };
                img.src = _URL.createObjectURL(file);
            }).then(
                () => {;[]
                    return file;12
                },
                () => {
                    this.$message.error(
                        "图片尺寸需大于750*750，且图片大小比例为1：1"
                    );
                    return Promise.reject();
                }
            );
            return isLt3M && isSize;
        },
    },
};
</script>

<style lang="scss">
.chosenClass {
    color: #eb7044;
    border-color: #eb7044;
}

.elDialogSpec {
    span {
        border: 1px solid #d3d4dc;
        padding: 3px 5px;
        margin-right: 10px;
        border-radius: 3px;
    }
}

.release_sale {
    .release_sale_form {
        .release_sale_form_add_specification {
            .parent_form_item {
                .child_form_item {
                    .el-input {
                        width: 140px !important;
                    }
                    .el-form-item__error {
                        top: 100%;
                        left: 0;
                    }
                    .el-form-item__label:before {
                        display: none;
                    }
                    .el-form-item__content {
                        position: relative;
                        width: 190px;
                        .long_input {
                            .el-input {
                                width: 190px !important;
                                .el-icon-error {
                                    right: 0;
                                }
                            }
                        }
                        .el-icon-error {
                            font-size: 18px;
                            color: #d3d4dc;
                            cursor: pointer;
                            position: absolute;
                            top: -7px;
                            right: 0;
                        }
                    }
                    .avatar-uploader .el-upload {
                        border: 1px dashed #d9d9d9;
                        border-radius: 6px;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    .avatar-uploader .el-upload:hover {
                        border-color: #409eff;
                    }
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        text-align: center;
                    }
                    .avatar {
                        width: 100px;
                        height: 100px;
                        display: block;
                    }
                }
                .el-form-item__error {
                    top: 50px;
                    left: 70px;
                }
            }
            .release_sale_form_add_specification_list {
                border: 1px solid #ebeef5;
                margin-bottom: 10px;
                color: #7a797a;
                .release_sale_form_add_specification_list_title {
                    background: #fcf3e1;
                    padding: 8px 20px 8px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .el-icon-error {
                        font-size: 18px;
                        color: #eb7044;
                        cursor: pointer;
                    }
                }
                .release_sale_form_add_specification_list_ul {
                    .release_sale_form_add_specification_list_ul_warp {
                        display: flex;
                        .release_sale_form_add_specification_list_ul_val {
                            margin-right: 5px;
                        }
                    }
                }
            }
        }
        .release_sale_form_add_specification_btn {
            background: #fcf3e1;
            padding: 5px 0px 5px 10px;
            button {
                color: #eb7044;
                border-color: #eb7044;
                padding: 10px 18px;
                font-size: 12px;
                background-color: #fcf3e1;
            }
            .disAbledBtn {
                color: #f8bea3;
                border-color: #f8bea3;
                /*background-color: #F8BEA3*/
            }
        }
    }
}
</style>

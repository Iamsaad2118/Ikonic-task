<template>
  <b-row>
    <b-col cols="12">
        <b-card-code>
            <!-- search input -->
            <div class="custom-search d-flex justify-content-end">
                <b-form-group>
                    <div class="d-flex align-items-center">
                    <label class="mr-1">Search</label>
                    <b-form-input
                        v-model="searchTerm"
                        placeholder="Search"
                        type="text"
                        class="d-inline-block"
                    />
                    </div>
                </b-form-group>
            </div>

            <!-- table -->
            <vue-good-table
            :columns="columns"
            :rows="rows"
            :rtl="direction"
            :search-options="{
                enabled: true,
                externalQuery: searchTerm }"
            :select-options="{
                enabled: true,
                selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
                selectionInfoClass: 'custom-class',
                selectionText: 'rows selected',
                clearSelectionText: 'clear',
                disableSelectInfo: true, // disable the select info panel on top
                selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
            }"
            :pagination-options="{
                enabled: true,
                perPage:pageLength
            }"
            >
            <template
                slot="table-row"
                slot-scope="props">

                <span v-if="props.column.field === 'created_at'" class="text-nowrap">{{ formatDate(props.row.created_at) }}</span>
                <span v-else-if="props.column.field === 'action'">
                    <span>
                        <b-dropdown
                        variant="link"
                        toggle-class="text-decoration-none"
                        no-caret
                        >
                        <template v-slot:button-content>
                            <feather-icon
                            icon="MoreVerticalIcon"
                            size="16"
                            class="text-body align-middle mr-25"
                            />
                        </template>
                        
                        <b-dropdown-item>
                            <b-link :to="{name:'add-comment', params: {id: props.row.id}}">
                                <feather-icon
                                    icon="TrashIcon"
                                    class="mr-50"
                                />
                                <span>Add Comment</span>
                            </b-link>
                        </b-dropdown-item>
                        </b-dropdown>
                    </span>
                </span>

                <!-- Column: Common -->
                <span v-else>
                {{ props.formattedRow[props.column.field] }}
                </span>
            </template>

            <!-- pagination -->
            <template slot="pagination-bottom" slot-scope="props">
                <div class="d-flex justify-content-between flex-wrap">
                <div class="d-flex align-items-center mb-0 mt-1">
                    <span class="text-nowrap ">
                    Showing 1 to
                    </span>
                    <b-form-select
                    v-model="pageLength"
                    :options="['3','5','10']"
                    class="mx-1"
                    @input="(value)=>props.perPageChanged({currentPerPage:value})"
                    />
                    <span class="text-nowrap"> of {{ props.total }} entries </span>
                </div>

                <div>
                    <b-pagination
                    :value="1"
                    :total-rows="props.total"
                    :per-page="pageLength"
                    first-number
                    last-number
                    align="right"
                    prev-class="prev-item"
                    next-class="next-item"
                    class="mt-1 mb-0"
                    @input="(value)=>props.pageChanged({currentPage:value})"
                    >
                    <template #prev-text>
                        <feather-icon
                        icon="ChevronLeftIcon"
                        size="18"
                        />
                    </template>
                    <template #next-text>
                        <feather-icon
                        icon="ChevronRightIcon"
                        size="18"
                        />
                    </template>
                    </b-pagination>
                </div>
                </div>
            </template>
            </vue-good-table>
        </b-card-code>
    </b-col>
  </b-row>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar, BBadge, BPagination, BFormGroup, BFormInput, BFormSelect, BDropdown, BDropdownItem, BRow, BCol, BLink
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Admin from "../../../api/admin";
import dayjs from 'dayjs';

export default {
  components: {
    BCardCode,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem, BRow, BCol, BLink
  },
  data() {
    return {
      pageLength: 15,
      dir: false,
      columns: [
        {
          label: 'Title',
          field: 'title',
        },
        {
          label: 'Description',
          field: 'description',
        },
        {
          label: 'Category',
          field: 'category.name',
        },
        {
          label: 'Created At',
          field: 'created_at',
        },
        {
            label: 'Action',
            field: 'action',
        },
      ],
      rows: [],
      searchTerm: '',
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.getFeedbacks();
  },
  methods :{
            getFeedbacks(){
                Admin.getFeedbacks(
                data => {
                    this.rows = data.data;
                },
                err => {
                    console.log(err);
                }
            );
        },
        formatDate(date) {
            return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
        },
    }
}
</script>

<style lang="scss">
    @import '~@core/scss/vue/libs/vue-good-table.scss';
    .custom-btn {
          border-color: #7367f0!important;
          background-color: #7367f0!important;
          color: white;
          text-align: center;
          border: 1px solid transparent;
          padding: 0.786rem 1.5rem;
          border-radius: 0.358rem;
          cursor: pointer;
      }
    .custom-btn:hover{
      box-shadow: 0 8px 25px -8px #7367f0;
      color: white;
    }
</style>
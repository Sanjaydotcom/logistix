<script>
import useJobTypeStore from "@/store/masters/jobType";
import { storeToRefs } from "pinia";
definePageMeta({
  layout: "freigtdashboard",
});
const treeData = {
  name: "CSS Jebel Ali",
  children: [
    {
      name: "G-SILL",
      children: [
        {
          name: "SEA",
          children: [
            {
              name: "IMPORT",
              children: [
                {
                  name: "LCL",
                  children: [
                    { name: "SILL" },
                    { name: "SILLX" },
                    { name: "SILLC" },
                    { name: "SILLP" },
                    { name: "SICL" },
                    { name: "SICLF" },
                    { name: "XSILL" },
                    { name: "PSIL" },
                    { name: "SISEN" },
                    { name: "FSIL" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "G-SIFL",
      children: [
        {
          name: "SEA",
          children: [
            {
              name: "IMPORT",
              children: [
                {
                  name: "FCL",
                  children: [
                    { name: "SIFL" },
                    { name: "SISE" },
                    { name: "SIFLF" },
                    { name: "SISEF" },
                    { name: "XSIFL" },
                    { name: "PSIF" },
                  ],
                },
              ],
            },
            {
              name: "CROSS TRADE",
              children: [{ name: "FCL", children: [{ name: "FCTR" }] }],
            },
          ],
        },
      ],
    },
    {
      name: "G-SELL",
      children: [
        {
          name: "SEA",
          children: [
            {
              name: "EXPORT",
              children: [
                {
                  name: "LCL",
                  children: [
                    { name: "SELL" },
                    { name: "XSELL" },
                    { name: "PSEL" },
                    { name: "FSEL" },
                    { name: "SECL" },
                    { name: "SECLF" },
                    { name: "SELLP" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "G-SEFL",
      children: [
        {
          name: "SEA",
          children: [
            {
              name: "EXPORT",
              children: [
                {
                  name: "FCL",
                  children: [
                    { name: "SEFL" },
                    { name: "XSEFL" },
                    { name: "PSEF" },
                    { name: "SEFLF" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "G-AIGP",
      children: [
        {
          name: "AIR",
          children: [
            {
              name: "IMPORT",
              children: [
                {
                  name: "IMPORT",
                  children: [
                    { name: "AIGNN" },
                    { name: "AIGPN" },
                    { name: "AIGN" },
                    { name: "AIGP" },
                    { name: "AICH" },
                    { name: "XAIGN" },
                    { name: "PAFI" },
                    { name: "AIGPB" },
                    { name: "AICO" },
                    { name: "CICE" },
                    { name: "AIAE" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    //
    {
      name: "G-AEGP",
      children: [
        {
          name: "AIR",
          children: [
            {
              name: "EXPORT",
              children: [
                {
                  name: "EXPORT",
                  children: [
                    {
                      name: "AECH",
                    },
                    {
                      name: "AECO",
                    },
                    {
                      name: "AEGN",
                    },
                    {
                      name: "AEGP",
                    },
                    {
                      name: "SIAE",
                    },
                    {
                      name: "XAEGN",
                    },
                    {
                      name: "PAFE",
                    },
                    {
                      name: "AEGPB",
                    },
                    {
                      name: "AEGNN",
                    },
                    {
                      name: "AEGPN",
                    },
                  ],
                },
                {
                  name: "PROJECT",
                  children: [
                    {
                      name: "PAFE",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    //
    {
      name: "G-LTP",
      children: [
        {
          name: "LAND",
          children: [
            {
              name: "TRANSPORT",
              children: [
                {
                  name: "TRANSPORT",
                  children: [
                    {
                      name: "LLTP",
                    },
                    {
                      name: "ILTP",
                    },
                    {
                      name: "LLPJO",
                    },
                    {
                      name: "ILTPN",
                    },
                    {
                      name: "LLTJ",
                    },
                    {
                      name: "LLTPO",
                    },
                  ],
                },
                {
                  name: "PROJECT",
                  children: [
                    {
                      name: "XILTP",
                    },
                    {
                      name: "PLTP",
                    },
                  ],
                },
              ],
            },
            {
              name: "IMPORT",
              children: [
                {
                  name: "TRANSPORT",
                  children: [
                    {
                      name: "LIPJ",
                    },
                  ],
                },
              ],
            },
            {
              name: "EXPORT",
              children: [
                {
                  name: "TRANSPORT",
                  children: [
                    {
                      name: "LEPJ",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    //
    {
      name: "G-WHST",
      children: [
        {
          name: "WAREHOUSE",
          children: [
            {
              name: "WAREHOUSE",
              children: [
                {
                  name: "STORAGE",
                  children: [
                    {
                      name: "WHST",
                    },
                    {
                      name: "OYST",
                    },
                    {
                      name: "OYSTN",
                    },
                    {
                      name: "OYSTO",
                    },
                    {
                      name: "XWHST",
                    },
                    {
                      name: "WHSTN",
                    },
                    {
                      name: "WHSTO",
                    },
                    {
                      name: "WSTN",
                    },
                    {
                      name: "AFWH",
                    },
                  ],
                },
                {
                  name: "CFS",
                  children: [
                    {
                      name: "CFSH",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "WAREHOUSE",
          children: [
            {
              name: "PROJECT",
              children: [
                {
                  name: "STORAGE",
                  children: [
                    {
                      name: "POST",
                    },
                    {
                      name: "PCST",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "PROJECT",
          children: [
            {
              name: "WAREHOUSE",

              children: [
                {
                  name: "STORAGE",
                  children: [
                    {
                      name: "POST",
                    },
                    {
                      name: "PCST",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "G-PALA",
      children: [
        {
          name: "WAREHOUSE",
          children: [
            {
              name: "WAREHOUSE",
              children: [
                {
                  name: "LASHING & PACKING",
                  children: [
                    {
                      name: "INLS",
                    },
                    {
                      name: "INPK",
                    },
                    {
                      name: "XPKRM",
                    },
                  ],
                },
                {
                  name: "PACKING & CRATING",
                  children: [
                    {
                      name: "PKRM",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "G-DOCS",
      children: [
        {
          name: "DOCS",
          children: [
            {
              name: "DOCS",
              children: [
                {
                  name: "DOCS",
                  children: [
                    {
                      name: "DOCS",
                    },
                    {
                      name: "DOCSN",
                    },
                    {
                      name: "GEN",
                    },
                    {
                      name: "GENN",
                    },
                    {
                      name: "SWBL",
                    },
                  ],
                },
              ],
            },
            {
              name: "IMPORT",
              children: [
                {
                  name: "CLEARANCE",
                  children: [
                    {
                      name: "IMCL",
                    },
                  ],
                },
              ],
            },
            {
              name: "PROJECT",
              children: [
                {
                  name: "CLEARANCE",
                  children: [
                    {
                      name: "PACL",
                    },
                  ],
                },
                {
                  name: "PROJECT",
                  children: [
                    {
                      name: "PDOC",
                    },
                  ],
                },
              ],
            },
            {
              name: "CLEARANCE",
              children: [
                {
                  name: "CLEARANCE",
                  children: [
                    {
                      name: "SFCL",
                    },
                    {
                      name: "SFCLN",
                    },
                    {
                      name: "AFCL",
                    },
                    {
                      name: "AFCLN",
                    },
                  ],
                },
                {
                  name: "PROJECT",
                  children: [
                    {
                      name: "POCL",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    //

    {
      name: "G_PDOC",
      children: [
        {
          name: "PROJECT",
          children: [
            {
              name: "EXPORT",
              children: [
                {
                  name: "PROJECT",
                  children: [
                    { name: "EBBE" },
                    { name: "YTSE" },
                    { name: "SEPJ" },
                  ],
                },
                { name: "RORO", children: [{ name: "SEBB" }] },
              ],
            },
            {
              name: "IMPORT",
              children: [
                {
                  name: "PROJECT",
                  children: [
                    { name: "EBBI" },
                    { name: "SIPJ" },
                    { name: "YTSI" },
                  ],
                },
                { name: "RORO", children: [{ name: "SIBB" }] },
              ],
            },
            {
              name: "PROJECT",
              children: [
                {
                  name: "PROJECT",
                  children: [
                    { name: "EQRL" },
                    { name: "PROCJ" },
                    { name: "PROJ" },
                  ],
                },
                { name: "RORO", children: [{ name: "PBBR" }] },
              ],
            },
            {
              name: "CROSSTRADE",
              children: [{ name: "CROSSTRADE", children: [{ name: "PCTR" }] }],
            },
          ],
        },
        { name: "DOCS" },
      ],
    },
  ],
};
export default {
  data() {
    return {
      treeData,
    };
  },
  setup(props) {
    const store = useJobTypeStore();
    const state = reactive({
      data: {},
      viewData: {
        level: 0,
        name: "",
        jobDescription: "",
        details: {
          groupLevel: "",
          miscellaneousCharges: "",
          miscellaneousChargesCode: "",
        },
      },
      isViewClicked: false,
    });
    const { treeViewData, treeFetchStatus } = storeToRefs(store);
    onMounted(() => {
      fetchData();
      state.isViewClicked = false;
    });
    watch(treeFetchStatus, () => {
      if (treeFetchStatus.value) {
        setData();
      }
    });
    const convertToHierarchy = (arry) => {
      var nodeObjects = createStructure(arry);
      for (var i = nodeObjects.length - 1; i >= 0; i--) {
        var currentNode = nodeObjects[i];
        if (currentNode.jobTypes[0].parentId === "") {
          continue;
        }
        var parent = getParent(currentNode, nodeObjects);

        if (parent === null) {
          continue;
        }

        parent.children.push(currentNode);
        nodeObjects.splice(i, 1);
      }
      return nodeObjects;
    };
    const createStructure = (nodes) => {
      var objects = [];
      for (var i = 0; i < nodes.length; i++) {
        objects.push({ ...nodes[i], children: [] });
      }

      return objects;
    };
    const getParent = (child, nodes) => {
      var parent = null;

      for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].id === child.jobTypes[0].parentId) {
          return nodes[i];
        }
      }

      return parent;
    };
    const setData = async () => {
      const data = await store.getTreeViewData();
      const desturcturedData = convertToHierarchy(data);
      state.data = {
        ...desturcturedData[0],
      };
      store.setFetchStatus(false);
    };
    const fetchData = async () => {
      await store.fetchData();
    };
    async function saveAndEditCallbackFunction(callBackData) {
      if (callBackData.IsEdit) {
        const data = {
          details: {
            groupLevel: callBackData.groupLevel,
            miscellaneousCharges: callBackData.miscellaneousCharges,
            miscellaneousChargesCode: callBackData.miscellaneousChargesCode,
          },
          jobTypes: [
            {
              parentId: callBackData.currentNodeData.jobTypes.parentId,
            },
          ],
          level: callBackData.currentNodeData.level,
          code: callBackData.name,
          jobName: callBackData.jobName,
          jobDescription: callBackData.jobDescription,
          name: callBackData.name,
          shortName: callBackData.name,
          notes: callBackData.name,
          miscellaneousCharges: callBackData.miscellaneousCharges,
        };
        await store.editJobType(data, callBackData.currentNodeData.id);
      } else {
        const data = {
          details: {
            groupLevel: callBackData.groupLevel,
            miscellaneousCharges: callBackData.miscellaneousCharges,
            miscellaneousChargesCode: callBackData.miscellaneousChargesCode,
          },
          jobTypes: [
            {
              parentId: callBackData.currentNodeData.id,
            },
          ],
          level: callBackData.currentNodeData.level + 1,
          code: callBackData.name,
          jobName: callBackData.jobName,
          jobDescription: callBackData.jobDescription,
          name: callBackData.name,
          shortName: callBackData.name,
          notes: callBackData.name,
          miscellaneousCharges: callBackData.miscellaneousCharges,
        };
        await store.saveJobType(data);
      }
      state.isViewClicked = false;
      fetchData();
    }
    async function deleteData(callBackData) {
      await store.deleteJobType(callBackData);
      fetchData();
    }
    const fetchViewData = async (callBackData) => {
      if(callBackData){
      state.isViewClicked = true;
      state.viewData = await callBackData;
      }else{
      state.isViewClicked = false;
      }
      console.log(callBackData);
    };
    return {
      state,
      convertToHierarchy,
      saveAndEditCallbackFunction,
      deleteData,
      fetchViewData,
    };
  },
};
</script>
<template>
  <div
    class="grid grid-cols-1 gap-2 overflow-auto border-r border-t border-gray-200 sm:grid-cols-3 md:w-full"
  >
    <div class="col-span-2 pt-8 sm:col-span-2">
      <TreeView
        v-if="state.data"
        class="item"
        :model="state.data"
        :saveAndEditCallbackFunction="saveAndEditCallbackFunction"
        :deleteData="deleteData"
        :viewCallBackData="fetchViewData"
      />
    </div>
    <!-- detailed View -->
    <div class="col-span-1 border-r border-l border-gray-200 sm:col-span-1">
      <section
        v-if="!state.isViewClicked"
        class="flex h-full flex-1 flex-col justify-center overflow-hidden xl:order-last"
      >
        <div class="flex h-full items-center justify-center">
          <!-- This example requires Tailwind CSS v2.0+ -->
          <div class="text-center">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              ></path>
            </svg>
            <p class="mt-5 text-sm text-gray-500">
              Select a service catelog to view Details
            </p>
          </div>
        </div>
      </section>
      <div v-if="state.isViewClicked">
        <h1 class="m-5 flex justify-center text-lg font-semibold text-gray-900">
          {{ state.viewData?.name }}
        </h1>
        <dl
          class="mt-2 divide-y divide-gray-200 border-t border-b border-gray-200"
        >
          <div class="flex justify-between py-3 text-sm font-medium">
            <dt class="m-3 text-gray-900">Miscellaneous Charges</dt>
            <dd class="m-3 text-gray-500">
              {{ state.viewData?.details.miscellaneousCharges }}
              {{ state.viewData?.details.miscellaneousChargesCode }}
            </dd>
          </div>
          <div v-if="state.viewData.level==2" class=" py-3 text-sm font-medium">
            <dt class="m-3 text-gray-900">Branch Level</dt>
            <dd class="m-3 text-gray-500">
              {{ state.viewData?.details.groupLevel.name }}
            </dd>
          </div>

          <div class="py-3 text-sm font-medium">
            <dt class="m-3 text-gray-900">Description</dt>
            <dd class="m-3 font-medium text-gray-500">
              {{ state.viewData?.jobDescription }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<template>
  <div :style="{'margin-top':'120px','color':'black','font-size':'13px'}" >
    <v-container>
      <v-row no-gutters>
        <v-col cols="6">
          <h2 :style="{'color':'black'}">Purchase Details</h2>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="5">Invoice: <b class="ml-2"></b>{{ invoiceData.invoice_id }}</v-col>
        <v-col cols="7">Date: {{ invoiceData.invoice_date}}</v-col> 
      </v-row>
      <v-row no-gutters class="mt-3">
        <v-col cols="5">
          <table>
            <tr>
              <td>Name:</td>
              <td><b>Every Day Plastic Industry</b></td>
            </tr>
            <tr v-for="(product, index) in invoiceData.products" :key="index">
             <td>
              <tr>
                <td>Product:</td>
                <td>{{ product.title }}</td>
              </tr>
              <tr>
                <td>Color:</td>
                <td>{{ product.color  }}</td>
              </tr>
              <tr>
                <td>Code:</td>
                <td>{{ product.code}}</td>
              </tr>
              <tr>
                <td>Sku:</td>
                <td>{{ product.sku }}</td>
              </tr>
              <v-divider v-if="index < invoiceData.products.length - 1" class="my-2"></v-divider>
             </td>
            </tr>
          </table>
        </v-col>
      
        <v-col cols="2"></v-col>
        <v-col cols="5">
          <table>
            <tr>
              <td>Supplier:</td>
              <td>
                <strong>
                  {{ invoiceData.supplier.name }}
                </strong>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top;">Email:</td>
              <td>{{ invoiceData.supplier.email }}</td>
            </tr>
            <tr>
              <td  style="vertical-align: top;">Address:</td>
              <td>{{ invoiceData.supplier.address }}</td>
            </tr>
            <tr>
              <td  style="vertical-align: top;">Phone:</td>
              <td>{{ invoiceData.supplier.phone }}</td>
            </tr>
            
          </table>
        </v-col>
      </v-row>
   
    </v-container>

    <v-container>
          <table :style="styleTableObject" width="100%">
            <thead>
              <tr>
                <th >
                  Sr
                </th>
                <th >
                  Code
                </th>
                <th >
                  Sku
                </th>
                <th >
                  Description
                </th>
                <th >
                  Color
                </th>
                <th>
                  Rate
                </th>
                <th>
                  Qty
                </th>
                <th>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in invoiceData.products" :key="index"  :style="{'text-transform':'none','text-align':'center'}">
                <td>{{ index + 1 }}</td>
                <td>{{ product.code }}</td>
                <td>{{ product.sku }}</td>
                <td>{{ product.title }}</td>
                <td>{{ product.color }}</td>  
                <td>{{ commaFormate(invoiceData.total_price) }}</td>
                <td>{{ commaFormate(invoiceData.total_qty)}}</td>
                <td>{{  commaFormate(invoiceData.total_price * invoiceData.total_qty) }}</td>
              </tr>
              

    
            </tbody>
          </table> 
             
    </v-container>
   
  </div>
</template>


<script setup lang="ts">
import { commaFormate } from '@/@core/utils/helpers';
import { usePurchaseForPrint } from '@/composable/usePurchaseInvoicePrint';

 
 const {  invoice } = usePurchaseForPrint();

 // Access nested data property from API response
 const invoiceData = computed(() => invoice.value.data);
      
      const styleTableObject = reactive({
        color:'black',
        fontSize:'13px',
        marginTop:'-20px'
      })
      
      
      
</script>



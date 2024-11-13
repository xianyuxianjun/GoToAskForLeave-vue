<script lang="ts" setup>
import {ref} from "vue";

const isDialogVisible = ref(false)
const firstName = ref('')
const middleName = ref('')
const lastName = ref('')
const email = ref('')
</script>

<template>
  <VDialog
    v-model="isDialogVisible"
    max-width="600"
  >
    <!-- Dialog Activator -->
    <template #activator="{ props }">
      <VBtn v-bind="props">
        批复
      </VBtn>
    </template>

    <!-- Dialog Content -->
    <VCard title="请假条">
      <DialogCloseBtn
        variant="text"
        size="default"
        @click="isDialogVisible = false"
      />
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="firstName"
              label="请假人"
              placeholder="请假人"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="middleName"
              label="请假天数"
              placeholder="请假天数"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            md="4"
          >
            <VTextField
              v-model="lastName"
              label="请假课程"
              persistent-hint
              placeholder="Doe"
            />
          </VCol>
          <VCol cols="12">
            <VTextField
              v-model="email"
              label="起止时间"
              placeholder="起止时间"
            />
          </VCol>
          <VCol cols="12">

          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
            <VTextarea
              label="请假事由"
              placeholder="请假事由"
            />
          </VCol>
          <VCol
            cols="12"
            sm="12"
          >
            <VTextarea
              label="批复"
              placeholder="批复"
            />
          </VCol>
        </VRow>
      </VCardText>

      <VCardText class="d-flex justify-end flex-wrap gap-4">
        <VBtn
          color="error"
          @click="isDialogVisible = false"
        >
          拒绝
        </VBtn>
        <VBtn
          color="success"
          @click="isDialogVisible = false"
        >
          同意
        </VBtn>
      </VCardText>
    </VCard>
  </VDialog>
</template>

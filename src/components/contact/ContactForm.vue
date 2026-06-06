<script setup lang="ts">
// =====================================================================
// ContactForm — the "How can we help?" card on /contact.
// Vue port of the design bundle's contact.js form flow: required-field
// validation (name, email + format, message) with inline errors that
// clear on input, focus moved to the first invalid field, and a success
// panel with a reset that clears everything. The form is a prototype
// (no backend). Option labels react to the locale via v-for + tBi.
// =====================================================================
import { nextTick, reactive, shallowRef, useTemplateRef } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { CONTACT_RESORT_OPTIONS, CONTACT_SUBJECTS } from '@/data/contact'

const { t, tBi } = useLocale()

const sent = shallowRef(false)

// Select values are keyed by the stable English label so the selection
// survives a locale switch while the visible labels re-render.
const blank = () => ({
  name: '',
  email: '',
  phone: '',
  subject: CONTACT_SUBJECTS[0]?.en ?? '',
  resort: CONTACT_RESORT_OPTIONS[0]?.en ?? '',
  message: '',
})
const form = reactive(blank())
const errors = reactive({ name: false, email: false, message: false })

const nameRef = useTemplateRef<HTMLInputElement>('nameInput')
const emailRef = useTemplateRef<HTMLInputElement>('emailInput')
const messageRef = useTemplateRef<HTMLTextAreaElement>('messageInput')

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

const submit = () => {
  errors.name = !form.name.trim()
  errors.email = !EMAIL_RE.test(form.email.trim())
  errors.message = !form.message.trim()
  if (errors.name || errors.email || errors.message) {
    // land focus on the first invalid field
    nextTick(() => {
      if (errors.name) nameRef.value?.focus()
      else if (errors.email) emailRef.value?.focus()
      else messageRef.value?.focus()
    })
    return
  }
  sent.value = true
}

const reset = () => {
  sent.value = false
  Object.assign(form, blank())
  errors.name = errors.email = errors.message = false
}
</script>

<template>
  <!-- x-reveal lives on this wrapper (which Vue never re-patches) so the
       reactive is-sent toggle on the form can't wipe the observer's
       is-in class. -->
  <div class="x-reveal">
    <form class="c-form" :class="{ 'is-sent': sent }" novalidate @submit.prevent="submit">
      <div class="c-form__body">
        <div class="x-eyebrow">{{ t('contactPage.formEyebrow') }}</div>
        <div class="c-grid">
          <div class="c-field" :class="{ 'is-error': errors.name }">
            <label for="cf-name">{{ t('contactPage.fieldName') }}<em>*</em></label>
            <input
              id="cf-name"
              ref="nameInput"
              v-model="form.name"
              type="text"
              :placeholder="t('contactPage.phName')"
              @input="errors.name = false"
            />
            <span class="c-field__err">{{ t('contactPage.errName') }}</span>
          </div>
          <div class="c-field" :class="{ 'is-error': errors.email }">
            <label for="cf-email">{{ t('contactPage.fieldEmail') }}<em>*</em></label>
            <input
              id="cf-email"
              ref="emailInput"
              v-model="form.email"
              type="email"
              :placeholder="t('contactPage.phEmail')"
              @input="errors.email = false"
            />
            <span class="c-field__err">{{ t('contactPage.errEmail') }}</span>
          </div>
          <div class="c-field">
            <label for="cf-phone">{{ t('contactPage.fieldPhone') }}</label>
            <input id="cf-phone" v-model="form.phone" type="tel" :placeholder="t('contactPage.phPhone')" />
          </div>
          <div class="c-field">
            <label for="cf-subject">{{ t('contactPage.fieldSubject') }}</label>
            <select id="cf-subject" v-model="form.subject">
              <option v-for="opt in CONTACT_SUBJECTS" :key="opt.en" :value="opt.en">{{ tBi(opt) }}</option>
            </select>
          </div>
          <div class="c-field c-field--full">
            <label for="cf-resort">{{ t('contactPage.fieldResort') }}</label>
            <select id="cf-resort" v-model="form.resort">
              <option v-for="opt in CONTACT_RESORT_OPTIONS" :key="opt.en" :value="opt.en">{{ tBi(opt) }}</option>
            </select>
          </div>
          <div class="c-field c-field--full" :class="{ 'is-error': errors.message }">
            <label for="cf-message">{{ t('contactPage.fieldMessage') }}<em>*</em></label>
            <textarea
              id="cf-message"
              ref="messageInput"
              v-model="form.message"
              :placeholder="t('contactPage.phMessage')"
              @input="errors.message = false"
            ></textarea>
            <span class="c-field__err">{{ t('contactPage.errMessage') }}</span>
          </div>
        </div>
        <div class="c-form__foot">
          <span class="c-form__note"><i data-lucide="shield-check"></i> {{ t('contactPage.note') }}</span>
          <button class="x-btn x-btn--gold c-form__go" type="submit">
            <i data-lucide="send"></i> {{ t('contactPage.send') }}
          </button>
        </div>
      </div>
      <div class="c-form__done" :class="{ 'is-on': sent }">
        <div class="c-done__check"><i data-lucide="check"></i></div>
        <h3>{{ t('contactPage.doneTitle') }}</h3>
        <p>{{ t('contactPage.doneBody') }}</p>
        <button class="x-btn x-btn--ghost" type="button" style="margin-top:24px" @click="reset">
          {{ t('contactPage.sendAnother') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
// =====================================================================
// MeetingsEnquiry — the dark "Plan your event" band on /meetings-events.
// Vue port of the design bundle's meetings.js enquiry flow: the form is
// a prototype (no backend) that swaps to a success panel on submit and
// back via "Send another". Field state is local; option labels react to
// the locale automatically (the prototype needed a MutationObserver for
// this — v-for + tBi makes it free). UI strings via vue-i18n (t);
// option lists from data (tBi).
// =====================================================================
import { reactive, shallowRef } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { ENQUIRY_EVENT_TYPES, ENQUIRY_GUEST_RANGES } from '@/data/meetings'

const { t, tBi } = useLocale()

const submitted = shallowRef(false)

// Option values are keyed by the stable English label so the selection
// survives a locale switch while the visible labels re-render.
const form = reactive({
  eventType: '',
  date: '',
  guests: ENQUIRY_GUEST_RANGES[0]?.en ?? '',
  email: '',
})

const submit = () => (submitted.value = true)
const reset = () => (submitted.value = false)
</script>

<template>
  <section class="m-enqband" id="enquire">
    <div class="x-section x-wrap" style="text-align:center">
      <div class="x-eyebrow is-center x-reveal" style="color:var(--xp-gold-soft)">{{ t('meetingsPage.enquireEyebrow') }}</div>
      <h2 class="x-h2 x-reveal" data-delay="1" style="color:#fff;margin:16px 0 0">{{ t('meetingsPage.enquireTitle') }}</h2>
      <p class="x-lead x-reveal" data-delay="2" style="color:var(--xp-on-dark-mut);margin:16px auto 0;max-width:560px">
        {{ t('meetingsPage.enquireLead') }}
      </p>

      <!-- The reveal observer adds `is-in` imperatively; keep it on a
           wrapper Vue never re-patches so the v-show toggles below
           can't wipe it (same caveat as the About accordion). -->
      <div class="x-reveal" data-delay="2">
        <form
          v-show="!submitted"
          class="m-enq"
          style="max-width:1000px;margin-left:auto;margin-right:auto"
          @submit.prevent="submit"
        >
          <div class="m-enq__field">
            <label for="enq-type">{{ t('meetingsPage.fieldEventType') }}</label>
            <select id="enq-type" v-model="form.eventType">
              <option value="" disabled>{{ t('meetingsPage.selectEventType') }}</option>
              <option v-for="opt in ENQUIRY_EVENT_TYPES" :key="opt.en" :value="opt.en">{{ tBi(opt) }}</option>
            </select>
          </div>
          <div class="m-enq__field">
            <label for="enq-date">{{ t('meetingsPage.fieldDate') }}</label>
            <input id="enq-date" v-model="form.date" type="date" />
          </div>
          <div class="m-enq__field">
            <label for="enq-guests">{{ t('meetingsPage.fieldGuests') }}</label>
            <select id="enq-guests" v-model="form.guests">
              <option v-for="opt in ENQUIRY_GUEST_RANGES" :key="opt.en" :value="opt.en">{{ tBi(opt) }}</option>
            </select>
          </div>
          <div class="m-enq__field">
            <label for="enq-email">{{ t('meetingsPage.fieldEmail') }}</label>
            <input id="enq-email" v-model="form.email" type="email" :placeholder="t('meetingsPage.emailPlaceholder')" />
          </div>
          <button class="x-btn x-btn--gold m-enq__go" type="submit">
            <i data-lucide="send"></i> {{ t('meetingsPage.requestProposal') }}
          </button>
        </form>

        <div v-show="submitted" class="m-enq__done is-on">
          <div class="m-enq__check"><i data-lucide="check"></i></div>
          <h3>{{ t('meetingsPage.doneTitle') }}</h3>
          <p>{{ t('meetingsPage.doneBody') }}</p>
          <button
            class="x-btn x-btn--ghost"
            style="margin-top:22px;color:#fff;border-color:rgba(255,255,255,.3)"
            @click="reset"
          >
            {{ t('meetingsPage.sendAnother') }}
          </button>
        </div>
      </div>

      <div class="m-enqnote x-reveal" data-delay="3">
        <i data-lucide="phone"></i> {{ t('meetingsPage.callNote') }}
      </div>
    </div>
  </section>
</template>

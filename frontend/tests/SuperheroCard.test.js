import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SuperheroCard from '../src/components/SuperheroCard.vue';
import axios from 'axios';
import { API_BASE_URL } from '../src/main.js';

vi.mock('axios');

describe('SuperheroCard.vue', () => {
    let hero;
    let wrapper;

    beforeEach(() => {
        hero = { id: 1, nickname: 'Superman', images: [{ url: '1757071351315-527508421.webp' }] };
        wrapper = mount(SuperheroCard, { props: { hero } });
    });

    it('renders hero nickname and image', () => {
        expect(wrapper.text()).toContain('Superman');
        const img = wrapper.find('img');
        expect(img.exists()).toBe(true);
        expect(img.attributes('src')).toContain(hero.images[0].url);
    });

    it('opens modal when deleteCard is called', async () => {
        expect(wrapper.vm.showModal).toBe(false);
        await wrapper.vm.deleteCard();
        expect(wrapper.vm.showModal).toBe(true);
    });

    it('calls axios.delete when confirmDelete is triggered', async () => {
        axios.delete.mockResolvedValue({ status: 200 });
        await wrapper.vm.confirmDelete();
        expect(axios.delete).toHaveBeenCalledWith(`${API_BASE_URL}/api/superheroes/${hero.id}`);
        expect(wrapper.emitted('hero-deleted')[0]).toEqual([hero.id]);
        expect(wrapper.vm.showModal).toBe(false);
    });
});

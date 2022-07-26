const request = require('supertest');
const app = require('../../server');
const Event = require('../../app/models/event');

describe('Events controller tests', () => {
	describe('when creating a new post', () => {
		it('should return 200 status when the event is successfully created', async () => {
			const res = await request(app).post('/api/events/').send({
				title: 'test',
				description: 'tested 5',
				data: '2022-06-24',
				published: 'true',
			});
			expect(res.status).toEqual(200);
			expect(res.body).toHaveProperty('title', 'test');
			expect(res.body).toHaveProperty('description', 'tested 5');
			expect(res.body).toHaveProperty('data', '2022-06-24');
			expect(res.body).toHaveProperty('published', true);
		});

		it('should return 400 when the res body doesn\'t have the title properties', async () => {
			const res = await request(app).post('/api/events/').send({
				description: 'tested 5',
				data: '2022-06-24',
			});
			expect(res.status).toEqual(400);
			expect(res.body).toHaveProperty(
				'message',
				'Title: Content can not be empty!',
			);
		});

		it('should return 400 when the res body doesn\'t have the data properties', async () => {
			const res = await request(app).post('/api/events/').send({
				title: 'test',
				description: 'tested 5',
			});
			expect(res.status).toEqual(400);
			expect(res.body).toHaveProperty(
				'message',
				'Data: Content can not be empty!',
			);
		});
	});

	describe('when retrieving events', () => {
		it('should return 200 status when all the events are successfully retrieved', async () => {
			const res = await request(app).get('/api/events/');

			expect(res.status).toEqual(200);
			expect(res.body).toHaveLength(1);
		});

		it('should return 200 status when a specific event is successfully retrieved', async () => {
			const event = await Event.create({
				title: 'test',
				description: 'lorem',
				data: '2022-06-24',
				published: true,
			});

			const res = await request(app).get(`/api/events/${event.id}`);

			expect(res.status).toEqual(200);
			expect(res.body).toHaveProperty('title', 'test');
			expect(res.body).toHaveProperty('description', 'lorem');
			expect(res.body).toHaveProperty('data', '2022-06-24');
		});

		it('should return 200 status when a published event is successfully retrieved', async () => {
			const res = await request(app).get('/api/events/published');
			expect(res.status).toEqual(200);
			expect(res.body[0]).toHaveProperty('published', true);
		});
	});

	describe('when updating events', () => {
		it('should return 200 status when all the events are successfully retrieved', async () => {
			const event = await Event.create({
				title: 'test',
				description: 'lorem',
				published: true,
			});

			const res = await request(app).put(`/api/events/${event.id}`).send({
				title: 'test',
				description: 'tested 5',
				published: false,
			});
			expect(res.status).toEqual(200);
			expect(res.body.message).toEqual('Event was updated successfully.');
		});
	});

	describe('when deleting events', () => {
		it('should return 200 status when a specific event is successfully deleted', async () => {
			const event = await Event.create({
				title: 'test',
				description: 'lorem',
				published: true,
			});

			const res = await request(app).delete(`/api/events/${event.id}`);
			expect(res.status).toEqual(200);
			expect(res.body.message).toEqual('Event was deleted successfully!');
		});

		it('should return 200 status when all the events are successfully deleted', async () => {
			await Event.bulkCreate([
				{
					title: 'test',
					description: 'lorem',
					published: true,
				},
				{
					title: 'test 2',
					description: 'lorem',
					published: false,
				},
			]);
			const eventsQuantity = await Event.count();

			const res = await request(app).delete('/api/events/');
			expect(res.status).toEqual(200);
			expect(res.body.message).toEqual(
				`${eventsQuantity} Events were deleted successfully!`,
			);
		});
	});
});

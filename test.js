import { Selector, ClientFunction } from 'testcafe';
const getLocation = ClientFunction(() => document.location.href);

fixture `E2E tests, home page`
    .page `https://${process.env.SQUASH_DOMAIN}/`;

test('create', async t => {
    await t
        .click('#create')
        .expect(getLocation()).contains('create');
});

fixture `E2E tests, create page`
    .page `https://${process.env.SQUASH_DOMAIN}/create/`;

test('create', async t => {
    await t
        .typeText(Selector('#name'), 'test')
        .expect(Selector('#name').value).eql('test');
    await t
        .typeText(Selector('#description'), 'test')
        .expect(Selector('#description').value).eql('test');
    await t
        .click('#submit')
        .expect(getLocation()).contains('/');
    const updateLink = Selector('.update');
    await t
        .expect(updateLink.count).eql(1);
});

fixture `E2E tests, edit`
    .page `https://${process.env.SQUASH_DOMAIN}/`;

test('edit', async t => {
    await t
        .click('.update')
        .expect(getLocation()).contains('actions');
    await t
        .typeText(Selector('input.form-control'), 'updated')
        .click('#submit')
        .expect(getLocation()).contains('/');
    const updateLink = Selector('.update');
    await t
        .expect(updateLink.count).eql(1);
});

test('create full', async t => {
    await t
        .click('#create')
        .expect(getLocation()).contains('create');
    await t
        .typeText(Selector('#name'), 'name');
    await t
        .typeText(Selector('#description'), 'description')
        .click('#submit')
        .expect(getLocation()).contains('/');
    const updateLink = Selector('.update');
    await t
        .expect(updateLink.count).eql(2);
});

test('delete', async t => {
    await t
        .click('.delete');
    await t
        .click('.delete');
    const updateLink = Selector('.update');
    await t
        .expect(updateLink.count).eql(0);
});

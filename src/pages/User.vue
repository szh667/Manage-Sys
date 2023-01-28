<template>
    <div class="userOuter">
        <UserTop />
        <UserTable />
    </div>
</template>

<script>
import UserTable from '../components/UserTable'
import UserTop from '../components/UserTop'
export default {
    name: 'User',
    components: { UserTable, UserTop },
}
</script>

<style>
.userOuter {
    padding: 10px;
}
</style>
<script lang="ts">
  import { flip } from "svelte/animate";
  import { createEventDispatcher } from "svelte";

  export let list: any[];

  let isOver: string | boolean = false;

  const dispatch = createEventDispatcher();

  function reorder({ from, to }: any) {
    const newList = [...list];

    // wtf is going on here!?
    newList[from] = [newList[to], (newList[to] = newList[from])][0];

    dispatch("sort", newList)
  }

  function getDraggedParent(target: any) {
    if (!target.dataset.index) {
      return getDraggedParent(target.parentNode);
    }

    return {...target.dataset}
  }

  function onDragStart(e: DragEvent) {
    const dragged = getDraggedParent(e.target);
    e.dataTransfer?.setData("sorce", dragged?.index.toString());
  }

  function onDragOver(e: DragEvent) {
    // @ts-ignore
    const id = e.target.dataset?.id;
    const dragged = getDraggedParent(e.target);
    isOver = dragged?.id ?? false;
  }

  function onDragLeave(e: DragEvent) {
    const dragged = getDraggedParent(e.target);
    isOver === dragged.id && (isOver = false);
  }

  function onDrop(e: DragEvent) {
    isOver = false;
    const dragged = getDraggedParent(e.target);
    reorder({
      from: e.dataTransfer?.getData("sorce"),
      to: dragged.index
    })
  }
</script>

{#if list?.length}
  <ul>
    {#each list as item, index (item.id)}
      <li
        class:over={item.id === isOver}
        data-index={index}
        data-id={item.id}
        draggable="true"
        on:dragstart={onDragStart}
        on:dragover|preventDefault={onDragOver}
        on:dragleave={onDragLeave}
        on:drop|preventDefault={onDrop}
        animate:flip={{ duration: 300 }}
      >
        <slot {item} {index} />
      </li>
    {/each}
  </ul>
{:else}
  <p>No items</p>
{/if}

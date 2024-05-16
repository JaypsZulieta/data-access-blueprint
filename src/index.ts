/**
 * Options for pagination.
 *
 * @typedef {Object} PaginationOptions
 * @property {number} pageNumber - The current page number.
 * @property {number} [pageSize] - The number of items per page.
 */
export type PaginationOptions = {
  pageNumber: number;
  pageSize?: number;
};

/**
 * Represents paginated content.
 *
 * @typedef {Object} PaginatedContent
 * @template TContent
 * @property {number} totalItems - The total number of items.
 * @property {number} totalPages - The total number of pages.
 * @property {TContent[]} content - The content items for the current page.
 * @property {number} currentPage - The current page number.
 */
export type PaginatedContent<TContent> = {
  totalItems: number;
  totalPages: number;
  content: TContent[];
  currentPage: number;
};

/**
 * Interface for creating an entity.
 *
 * @interface CreateRepository
 * @template TCreationData
 * @template TEntity
 */
export interface CreateRepository<TCreationData, TEntity> {
  /**
   * Creates a new entity.
   *
   * @param {TCreationData} entity - The data to create the entity.
   * @returns {Promise<TEntity>} The created entity.
   */
  create(entity: TCreationData): Promise<TEntity>;
}

/**
 * Interface for reading entities.
 *
 * @interface ReadRepository
 * @template TPrimaryKey
 * @template TEntity
 */
export interface ReadRepository<TPrimaryKey, TEntity> {
  /**
   * Finds an entity by its primary key.
   *
   * @param {TPrimaryKey} primaryKey - The primary key of the entity.
   * @returns {Promise<TEntity>} The entity if found.
   */
  findByPrimaryKey(primaryKey: TPrimaryKey): Promise<TEntity>;
  /**
   * Checks if an entity exists by its primary key.
   *
   * @param {TPrimaryKey} primaryKey - The primary key of the entity.
   * @returns {Promise<boolean>} True if the entity exists, false otherwise.
   */
  existByPrimaryKey(primaryKey: TPrimaryKey): Promise<boolean>;

  /**
   * Finds all entities with optional pagination.
   *
   * @param {PaginationOptions} [options] - The pagination options.
   * @returns {Promise<PaginatedContent<TEntity>>} The paginated content.
   */
  findAll(options?: PaginationOptions): Promise<PaginatedContent<TEntity>>;

  /**
   * Counts the total number of entities.
   *
   * @returns {Promise<number>} The total number of entities.
   */
  count(): Promise<number>;
}

/**
 * Interface for updating an entity.
 *
 * @interface UpdateRepository
 * @template TUpdateData
 * @template TPrimaryKey
 * @template TEntity
 */
export interface UpdateRepository<TUpdateData, TPrimaryKey, TEntity> {
  /**
   * Updates an entity by its primary key.
   *
   * @param {TUpdateData} data - The update data.
   * @param {TPrimaryKey} primaryKey - The primary key of the entity to update.
   * @returns {Promise<TEntity>} The updated entity.
   */
  update(data: TUpdateData, primaryKey: TPrimaryKey): Promise<TEntity>;
}

/**
 * Interface for deleting an entity.
 *
 * @interface DeleteRepository
 * @template TPrimaryKey
 */
export interface DeleteRepository<TPrimaryKey> {
  /**
   * Deletes an entity by its primary key.
   *
   * @param {TPrimaryKey} primaryKey - The primary key of the entity to delete.
   * @returns {Promise<void>} A promise that resolves when the entity is deleted.
   */
  deleteByPrimaryKey(primaryKey: TPrimaryKey): Promise<void>;
}

/**
 * Interface for CRUD (Create, Read, Update, Delete) operations.
 *
 * @interface CRUDRepository
 * @template TCreationData
 * @template TUpdateData
 * @template TPrimaryKey
 * @template TEntity
 * @extends {CreateRepository<TCreationData, TEntity>}
 * @extends {ReadRepository<TPrimaryKey, TEntity>}
 * @extends {UpdateRepository<TUpdateData, TPrimaryKey, TEntity>}
 * @extends {DeleteRepository<TPrimaryKey>}
 */
export interface CRUDRepository<TCreationData, TUpdateData, TPrimaryKey, TEntity>
  extends CreateRepository<TCreationData, TEntity>,
    ReadRepository<TPrimaryKey, TEntity>,
    UpdateRepository<TUpdateData, TPrimaryKey, TEntity>,
    DeleteRepository<TPrimaryKey> {}

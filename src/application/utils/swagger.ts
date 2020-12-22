/* eslint-disable @typescript-eslint/ban-types */
import { PipeTransform, Query } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiParam,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger';
import { ParameterStyle } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiFilterWhere = (model?: Function): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiExtraModels(model)(target, propertyKey, descriptor);
  return ApiQuery({
    name: 'query',
    type: 'object',
    required: false,
    schema: {
      type: 'object',
      properties: {
        where: {
          nullable: true,
          default: '{}',
          type: 'object',
          $ref: getSchemaPath(model),
        },
      },
    },
  })(target, propertyKey, descriptor);
};

export const ApiFilterOffset = (): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  return ApiQuery({ name: 'offset', type: 'number', required: false })(
    target,
    propertyKey,
    descriptor,
  );
};

export const ApiFilterLimit = (): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  return ApiQuery({ name: 'limit', type: 'number', required: false })(
    target,
    propertyKey,
    descriptor,
  );
};

export const ApiFilterOrder = (): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  return ApiQuery({
    name: 'order',
    required: false,
    isArray: true,
    type: 'string',
  })(target, propertyKey, descriptor);
};

export class NestedArrayPipe
  implements PipeTransform<string[] | undefined, string[][]> {
  transform(value: string[] | undefined): string[][] {
    // null check.
    if (!value) return [];
    let orders = value;
    // case of only one element (type is string) handle.
    if (!Array.isArray(value)) orders = [value];
    return orders.map(e => e.split(',').map(e => e.trim()));
  }
}

export const FilterOrder = (): ParameterDecorator => (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number,
) => {
  return Query('order', NestedArrayPipe)(target, propertyKey, parameterIndex);
};

export const ApiFilterEnhance = (model?: Function): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  ApiFilterWhere(model)(target, propertyKey, descriptor);
  ApiFilterOffset()(target, propertyKey, descriptor);
  ApiFilterLimit()(target, propertyKey, descriptor);
  return ApiFilterOrder()(target, propertyKey, descriptor);
};

export const ApiArrayParam = ({
  name,
  type,
  style = 'simple',
  explode = true,
}: {
  name: string;
  type: string;
  style?: ParameterStyle;
  explode?: boolean;
}): MethodDecorator => (
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) => {
  return ApiParam({
    name,
    schema: {
      type: 'array',
      items: {
        type,
      },
      minItems: 1,
    },
    style,
    explode,
  })(target, propertyKey, descriptor);
};
